import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ตรวจสอบว่าอยู่ในเบราว์เซอร์หรือไม่
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      this.isLoggedIn = !!localStorage.getItem('token');
    }
  
    // ตรวจสอบว่าอยู่ในหน้า login หรือ register
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === '/login';
        this.isRegisterPage = this.router.url === '/register';
      }
    });
  }

}
