import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  questions: any[] = [];
  selectedPeriod: string = 'day'; // Tracks the selected period
  isLoading: boolean = false; // Tracks the loading state
  errorMessage: string = ''; // For error handling

  constructor(private questionService: QuestionService, private router: Router) { }

  ngOnInit(): void {
    this.fetchQuestions('day');
  }

  fetchQuestions(period: string): void {
    this.selectedPeriod = period; // Update selected period
    this.isLoading = true; // Start loading
    this.errorMessage = ''; // Reset error message

    this.questionService.fetchQuestions(period).subscribe(
      data => {
        this.questions = data;
        this.isLoading = false; // Stop loading
      },
      error => {
        this.isLoading = false; // Stop loading
        this.errorMessage = 'Error fetching questions. Please try again later.';
        console.error('Error fetching questions', error);
      }
    );
  }
}
