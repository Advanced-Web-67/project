import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  questions: any[] = [];
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchQuestions('day');
  }

  fetchQuestions(period: string): void {
    this.http.get<any[]>(`${this.apiUrl}/question/${period}`).subscribe(
      data => this.questions = data,
      error => console.error('Error fetching questions', error)
    );
  }
}
