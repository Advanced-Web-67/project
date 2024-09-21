import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'http://localhost:3000/question'; // Backend URL

  constructor(private http: HttpClient) {}

  createQuestion(questionData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${this.apiUrl}/create`, questionData, { headers });
  }
  
  getQuestionById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  getAllQuestions(): Observable<{ questions: any[] }> {
    return this.http.get<{ questions: any[] }>(`${this.apiUrl}/all`);
  }

  fetchQuestions(period: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/period/${period}`);
  }


  getQuestionsByUserId(user_id: string): Observable<{questions: any[]}> {
    return this.http.get<{ questions: any[] }>(`${this.apiUrl}/byUser/${user_id}`);
  }

  filterQuestions(tag: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/questions/filter?tag=${tag}`);
  }

  updateQuestion(id: string, questionData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put(`${this.apiUrl}/update/${id}`, questionData, { headers });
  }

  deleteQuestion(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers });
  }

}
