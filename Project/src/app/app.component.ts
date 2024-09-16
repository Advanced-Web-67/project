import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;
      this.isLoginPage = currentUrl === '/login';
      this.isRegisterPage = currentUrl === '/register';
    });
  }
}
