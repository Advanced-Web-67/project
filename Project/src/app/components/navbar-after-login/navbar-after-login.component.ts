import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../../services/profiles/userdata/userdata.service';

@Component({
  selector: 'app-navbar-after-login',
  templateUrl: './navbar-after-login.component.html',
  styleUrl: './navbar-after-login.component.css'
})

export class NavbarAfterLoginComponent implements OnInit {
  userid: string | null = null;
  username: string | null = null;
  userImage: string = ''; // ตั้งค่ารูปเริ่มต้นหรือจาก API

  constructor( private userdata: UserdataService){}
  ngOnInit(): void {
    // ดึงข้อมูล username และ user image จาก localStorage หรือ API
    this.username = localStorage.getItem('username');
    this.userid = localStorage.getItem('userid');
     // ดึงรูปจาก localStorage หรือใช้รูปเริ่มต้น
     this.userdata.getUser(this.userid).subscribe(user => {
      this.userImage = user.picture; // Assuming picture is stored as a base64 string
    });
  }

  onLogout(): void {
    // ลบข้อมูลเมื่อออกจากระบบ
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }

}

