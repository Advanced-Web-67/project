import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QadataService {
  private apiUrlQuestions = 'http://localhost:3000/profile/questions';
  private apiUrlAnswers = 'http://localhost:3000/profile/answers';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlQuestions);
  }

  getAnswers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlAnswers);
  }
}