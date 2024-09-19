import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-after-login',
  templateUrl: './navbar-after-login.component.html',
  styleUrl: './navbar-after-login.component.css'
})

export class NavbarAfterLoginComponent implements OnInit {
  username: string | null = null;
  userImage: string = '/src/assets/images/user.png'; // ตั้งค่ารูปเริ่มต้นหรือจาก API

  ngOnInit(): void {
    // ดึงข้อมูล username และ user image จาก localStorage หรือ API
    this.username = localStorage.getItem('username');
     // ดึงรูปจาก localStorage หรือใช้รูปเริ่มต้น
  }

  onLogout(): void {
    // ลบข้อมูลเมื่อออกจากระบบ
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    
  }
}

