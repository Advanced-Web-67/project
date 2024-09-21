import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  private apiUrl = 'http://localhost:3000/profile/user';
  private userIdSubject = new BehaviorSubject<string|null>(''); // Default value
  currentUserId = this.userIdSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUser(id: string|null): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getUserPictures(userId: string|null): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}/pictures`);
  }

  setUserId(userId: string | null) {
    this.userIdSubject.next(userId);
  }

  updateUser(id: string | null, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData);
  }

  getAllUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/all`);
  }
}
