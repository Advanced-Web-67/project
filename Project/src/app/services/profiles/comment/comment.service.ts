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
    return this.http.post<any>(`${this.apiUrl}/create`, commentData);
  }

  // Method to get comments by user_id
  getCommentsByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/comment/${userId}`);
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${commentId}`);
  }

}
