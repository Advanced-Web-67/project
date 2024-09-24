import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // นำเข้า Router
import { HttpClient } from '@angular/common/http'; // นำเข้า HttpClient
import { ToastrService } from 'ngx-toastr'; // นำเข้า ToastrService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,  // เพิ่ม HttpClient ที่นี่
    private toastr: ToastrService, // เพิ่ม ToastrService ที่นี่
    private router: Router  // เพิ่ม Router ที่นี่
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // ส่งข้อมูลไปยัง backend ด้วย HttpClient
      this.http.post('http://localhost:3000/login/signin', { username, password })
        .subscribe(
          (response: any) => {
            
            // แสดงข้อความสำเร็จ
            this.toastr.success('เข้าสู่ระบบสำเร็จ', 'Success');
            
            // เก็บ Token และเปลี่ยนหน้าไปยังหน้าอื่น
            // localStorage.setItem('userid',response.)
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', response.result.username);
            localStorage.setItem('userid', response.result.id);
            localStorage.setItem('picture', response.result.picture);
            
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 2000); 

            setTimeout(() => {
              window.location.reload()
            }, 2050); 

          },
          (error) => {
            // แสดง error หากมีข้อผิดพลาดจาก backend
            const errorMessage = error.error?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
            this.toastr.error(errorMessage, 'Error');
            console.error('Error:', error);
          }
        );
    }
  }

}
