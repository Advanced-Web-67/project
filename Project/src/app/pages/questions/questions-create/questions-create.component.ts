import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-questions-create',
  templateUrl: './questions-create.component.html',
  styleUrls: ['./questions-create.component.css']
})
export class QuestionsCreateComponent implements OnInit {
  createQuestionForm!: FormGroup;
  imageBase64: string | null = null; // ตัวแปรเก็บรูปภาพในรูปแบบ base64

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createQuestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      body: ['', [Validators.required, Validators.minLength(30)]],
      tags: ['', [Validators.required]],
      image: [null] // เพิ่มช่องสำหรับไฟล์รูปภาพ
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageBase64 = reader.result as string; // แปลงรูปภาพเป็น base64
      };
      reader.readAsDataURL(file); // อ่านไฟล์รูปภาพและแปลงเป็น base64
    }
  }

  onSubmit(): void {
    if (this.createQuestionForm.valid) {
      const { title, body, tags } = this.createQuestionForm.value;
      
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
      this.http.post('http://localhost:3000/question/create', { title, body, tags, image: this.imageBase64 }, { headers })
        .subscribe(
          (response: any) => {
            this.toastr.success('สร้างคำถามสำเร็จ!', 'Success');
            this.router.navigate(['/questions']); // เปลี่ยนไปที่หน้าหลักของคำถาม
          },
          (error) => {
            this.toastr.error('เกิดข้อผิดพลาดในการสร้างคำถาม', 'Error');
            console.error('Error:', error);
          }
        );
    }
  }
}
