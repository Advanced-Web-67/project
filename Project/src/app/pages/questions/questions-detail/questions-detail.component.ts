import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question/question.service';
import { UserdataService } from '../../../services/profiles/userdata/userdata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-question-detail',
  templateUrl: './questions-detail.component.html',
  styleUrls: ['./questions-detail.component.css'],
})
export class QuestionsDetailComponent implements OnInit {
  createAnswerForm!: FormGroup;

  question: any;
  username!: string;
  user_id!: string; // เก็บ ID ของผู้ใช้ปัจจุบันที่เข้าสู่ระบบ
  question_id!: string

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private userService: UserdataService,
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // สร้างฟอร์มการตอบคำถาม
    this.createAnswerForm = this.fb.group({
      answertext: ['', [Validators.required, Validators.minLength(10)]], // คำตอบต้องมีอย่างน้อย 10 ตัวอักษร
    });

    // โหลดข้อมูลคำถามตาม id
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadQuestion(id);
        this.question_id = id;
      }
    });

    // โหลดข้อมูลผู้ใช้ปัจจุบัน (จากบริการ UserdataService หรือ token)
    const userid = localStorage.getItem('userid');

    if (userid) {
      this.user_id = userid
    } else {
      this.toastr.error('กรุณาเข้าสู่ระบบก่อน!', 'Unauthorized');
    }
  }

  loadQuestion(id: string): void {
    this.questionService.getQuestionById(id).subscribe(
      (question) => {
        this.question = question;
        // โหลดข้อมูลของผู้ตั้งคำถามจาก user_id ของคำถาม
        this.userService.getUser(question.user_id).subscribe(
          (user) => {
            this.username = user.username; // ตั้งค่า username ของผู้ตั้งคำถาม
          },
          (error) => {
            console.error('Error loading user', error);
          }
        );
      },
      (error) => {
        console.error('Error loading question', error);
      }
    );
  }

  onSubmit(): void {
    // ตรวจสอบความถูกต้องของฟอร์มก่อนส่ง
    if (this.createAnswerForm.valid) {
      const { answertext } = this.createAnswerForm.value;

      // ตรวจสอบว่า token มีอยู่หรือไม่
      const token = localStorage.getItem('token');
      if (!token) {
        this.toastr.error('กรุณาเข้าสู่ระบบก่อน!', 'Unauthorized');
        return;
      }

      // ตั้งค่า header สำหรับการส่ง token ในการ request
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      // ส่งคำตอบพร้อมกับ user_id และ question_id
      const payload = {
        answertext,
        user_id: this.user_id, // ผู้ใช้ที่ตอบคำถาม
        question_id: this.question_id, // ID ของคำถาม
      };

      // ส่งคำตอบไปยัง backend
      this.http
        .post('http://localhost:3000/answer/create', payload, { headers })
        .subscribe(
          (response: any) => {
            this.toastr.success('ตอบคำถามสำเร็จ!', 'Success');
            // this.router.navigate(['/questions']); // เปลี่ยนไปที่หน้าหลักของคำถาม (หรืออัปเดตคำตอบ)
          },
          (error) => {
            this.toastr.error('เกิดข้อผิดพลาดในการตอบคำถาม', 'Error');
            console.error('Error:', error);
          }
        );
    }
  }
}
