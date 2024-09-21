import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private baseUrl = 'http://localhost:3000/answer'; // Update with your API base URL

  constructor(private http: HttpClient) {}

  getAnswersByQuestionId(questionId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${this.baseUrl}/byQuestion/${questionId}`, { headers });
  }
}
