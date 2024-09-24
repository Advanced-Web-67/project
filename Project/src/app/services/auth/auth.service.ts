import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Check if the user is authenticated (e.g., if token exists in localStorage)
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token'); // Or use sessionStorage or other storage mechanisms
    return !!token;  // Return true if token exists
  }

  // Optionally add a logout method
  logout() {
    localStorage.removeItem('token');
  }
}
