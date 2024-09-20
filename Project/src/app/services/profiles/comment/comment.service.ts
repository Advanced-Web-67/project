import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/comment';
  constructor(private http: HttpClient) { }
  
  createComment(commentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${this.apiUrl}/create`, commentData, { headers });
  }
}
