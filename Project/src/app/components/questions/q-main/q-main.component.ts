import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question/question.service';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-q-main',
  templateUrl: './q-main.component.html',
  styleUrls: ['./q-main.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query('.card', [
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          stagger(200, [
            animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class QMainComponent implements OnInit {
  questions: any[] = []; // All questions
  filteredQuestions: any[] = []; // Filtered questions

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getAllQuestions().subscribe(
      (response: { questions: any[] }) => {
        this.questions = response.questions || [];
        this.filteredQuestions = this.questions;
      },
      (error) => {
        console.error('Error loading questions', error);
      }
    );
  }

  onFilter(tags: string): void {
    this.filteredQuestions = this.questions.filter(question => 
      question.tags === tags
    );
  }

  resetFilter(): void {
    this.filteredQuestions = this.questions; // Reset to all questions
  }
}
