import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-detail',
  templateUrl: './questions-detail.component.html',
  styleUrls: ['./questions-detail.component.css']
})
export class QuestionsDetailComponent implements OnInit {
  questionId!: number;
  question: any;

  // ข้อมูลจำลอง
  questions = [
    {
      questionId: 1,
      topic: "How to learn Angular effectively?",
      detail: "I'm starting to learn Angular and wondering about the best practices to become proficient...",
      askedOn: "2024-09-10 14:35",
      userId: 101,
      username: "john_doe"
    },
    {
      questionId: 2,
      topic: "What are Angular lifecycle hooks?",
      detail: "I've heard about lifecycle hooks in Angular, but I'm not sure how they work or when to use them...",
      askedOn: "2024-09-12 09:15",
      userId: 102,
      username: "jane_smith"
    },
    {
      questionId: 3,
      topic: "Difference between Reactive and Template-driven forms",
      detail: "Can someone explain the difference between reactive forms and template-driven forms in Angular?...",
      askedOn: "2024-09-13 18:45",
      userId: 103,
      username: "mike_jones"
    },
    {
      questionId: 4,
      topic: "How to optimize Angular app performance?",
      detail: "My Angular application seems to slow down as the project grows...",
      askedOn: "2024-09-14 07:22",
      userId: 104,
      username: "sara_connor"
    },
    {
      questionId: 5,
      topic: "Understanding Angular Dependency Injection",
      detail: "I'm having trouble fully understanding how dependency injection works in Angular...",
      askedOn: "2024-09-11 12:30",
      userId: 105,
      username: "bruce_wayne"
    }
  ];
userId: any;
  


  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.questionId = +params['id']; // ดึง questionId จาก URL
      this.question = this.questions.find(q => q.questionId === this.questionId);
    });
  }
}
