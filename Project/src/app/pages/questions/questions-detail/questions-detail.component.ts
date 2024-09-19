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
  currentUserId = 201;
  
  

  questions = [
    {
      questionId: 1,
      topic: "How to learn Angular effectively?",
      detail: "I'm starting to learn Angular and wondering about the best practices to become proficient...",
      askedOn: "2024-09-10 14:35",
      userId: 101,
      username: "john_doe",
      imageUrl: 'https://www.khaosod.co.th/wpapp/uploads/2024/09/Nong-Moo-Deng4548-5.jpg',
      answers: [
        {
          answerId: 1,
          detail: "I recommend starting with the official documentation and building small projects.",
          answeredOn: "2024-09-11 10:20",
          username: "alice",
          userId: 201 // userId ของผู้ตอบคำถาม
        },
        {
          answerId: 2,
          detail: "You can try various tutorials on YouTube to understand core concepts.",
          answeredOn: "2024-09-12 08:15",
          username: "bob",
          userId: 202 // userId ของผู้ตอบคำถาม
        }
      ]
    },
    {
      questionId: 2,
      topic: "What are Angular lifecycle hooks?",
      detail: "I've heard about lifecycle hooks in Angular, but I'm not sure how they work or when to use them...",
      askedOn: "2024-09-12 09:15",
      userId: 102,
      username: "jane_smith",
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      questionId: 3,
      topic: "Difference between Reactive and Template-driven forms",
      detail: "Can someone explain the difference between reactive forms and template-driven forms in Angular?...",
      askedOn: "2024-09-13 18:45",
      userId: 103,
      username: "mike_jones",
      imageUrl: null // ไม่มีรูปภาพ
    },
    {
      questionId: 4,
      topic: "How to optimize Angular app performance?",
      detail: "My Angular application seems to slow down as the project grows...",
      askedOn: "2024-09-14 07:22",
      userId: 104,
      username: "sara_connor",
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      questionId: 5,
      topic: "Understanding Angular Dependency Injection",
      detail: "I'm having trouble fully understanding how dependency injection works in Angular...",
      askedOn: "2024-09-11 12:30",
      userId: 105,
      username: "bruce_wayne",
      imageUrl: null // ไม่มีรูปภาพ
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
