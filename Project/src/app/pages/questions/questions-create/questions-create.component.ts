import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // ใช้สำหรับเปลี่ยนหน้า
import { HttpClient } from '@angular/common/http'; // ใช้สำหรับเรียก API
import { ToastrService } from 'ngx-toastr'; // ใช้สำหรับแสดงข้อความแจ้งเตือน

@Component({
  selector: 'app-questions-create',
  templateUrl: './questions-create.component.html',
  styleUrls: ['./questions-create.component.css']
})
export class QuestionsCreateComponent implements OnInit {
  createQuestionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createQuestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      tags: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.createQuestionForm.valid) {
      const { title, description, tags } = this.createQuestionForm.value;

      // เรียก API เพื่อสร้างคำถามใหม่
      this.http.post('http://localhost:3000/questions/create', { title, description, tags })
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
