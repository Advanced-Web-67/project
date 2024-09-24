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
    // Check if user is logged in by checking for a token in localStorage
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      this.isLoggedIn = !!localStorage.getItem('token');
    }
  
    // Listen to router events to check if the current route is /login or /register
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === '/login';
        this.isRegisterPage = this.router.url === '/register';
      }
    });
  }

  // Logic to determine which navbar to display
  getNavbarState(): string {
    if (this.isLoginPage || this.isRegisterPage) {
      return ''; // Don't display navbar on login/register pages
    } else if (this.isLoggedIn) {
      return 'afterLogin'; // Show after-login navbar
    } else {
      return 'beforeLogin'; // Show before-login navbar
    }
  }
}
