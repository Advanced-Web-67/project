import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question/question.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  questions: any[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.fetchQuestions('day');
  }

  fetchQuestions(period: string): void {
    this.questionService.fetchQuestions(period).subscribe(
      data => this.questions = data,
      error => console.error('Error fetching questions', error)
    );
  }
}
