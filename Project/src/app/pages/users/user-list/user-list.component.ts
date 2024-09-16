import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  isLoading = true;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    // ตรวจสอบว่ามี token หรือไม่
    const token = localStorage.getItem('token');

    if (!token) {
      // ถ้าไม่มี token, นำทางไปที่หน้า login
      this.router.navigate(['/login']);
      return;
    }

    // กำหนด headers ด้วย token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>('http://localhost:3000/api/users', { headers })
      .subscribe(
        (response) => {
          this.users = response;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching users:', error);
          this.isLoading = false;
          // ถ้ามีข้อผิดพลาดเกี่ยวกับการยืนยันตัวตน เช่น token หมดอายุ
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      );
  }
}
