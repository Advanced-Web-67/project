import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // นำเข้า ToastrService
import { Router } from '@angular/router';  // นำเข้า Router
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient  
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, email, password, confirmPassword } = this.registerForm.value;
      
      if (password !== confirmPassword) {
        this.toastr.error('รหัสผ่านไม่ตรงกัน', 'Error');
        return;
      }
  
      // ส่งข้อมูลไปยัง backend ด้วย HttpClient
      this.http.post('http://localhost:3000/register/signup', { username, email, password })
        .subscribe(
          (response) => {
            // แสดงข้อความสำเร็จ
            this.toastr.success('สมัครสมาชิกสำเร็จ', 'Success');
  
            // เปลี่ยนหน้าไปยังหน้า login หลังจากสมัครสำเร็จ
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000); 
          },
          (error) => {
            // แสดง error หากมีข้อผิดพลาดจาก backend
            const errorMessage = error.error?.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก';
            this.toastr.error(errorMessage, 'Error');
            console.error('Error:', error);
          }
        );
    }
  }
}
