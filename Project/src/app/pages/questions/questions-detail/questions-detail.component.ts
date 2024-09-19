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

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private userService: UserdataService,
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadQuestion(id);
      }
    });
  }

  loadQuestion(id: string): void {
    this.questionService.getQuestionById(id).subscribe(
      (question) => {
        this.question = question;

        // หลังจากดึงข้อมูลคำถามแล้ว เรียกข้อมูลผู้ใช้จาก user_id
        this.userService.getUser(question.user_id).subscribe(
          (user) => {
            this.username = user.username; // เก็บ username ที่ได้จากผู้ใช้
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
    if (this.createAnswerForm.valid) {
      const { answertext, user_id, question_id} = this.createAnswerForm.value;
      
      // ตรวจสอบว่า token มีอยู่หรือไม่
      const token = localStorage.getItem('token');
      if (!token) {
        this.toastr.error('กรุณาเข้าสู่ระบบก่อน!', 'Unauthorized');
        return;
      }

      // ตั้งค่า header สำหรับการส่ง token ในการ request
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      // ส่งคำถามพร้อมกับรูปภาพในรูปแบบ base64
      this.http.post('http://localhost:3000/question/answer', { answertext, user_id, question_id}, { headers })
        .subscribe(
          (response: any) => {
            this.toastr.success('สร้างคำถามสำเร็จ!', 'Success');
            // this.router.navigate(['/questions']); // เปลี่ยนไปที่หน้าหลักของคำถาม
          },
          (error) => {
            this.toastr.error('เกิดข้อผิดพลาดในการสร้างคำถาม', 'Error');
            console.error('Error:', error);
          }
        );
    }
  }
}
