import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-q-main',
  templateUrl: './q-main.component.html',
  styleUrl: './q-main.component.css'
})
export class QMainComponent implements OnInit {
  questionId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // ดึง questionId จาก URL
    this.questionId = this.route.snapshot.paramMap.get('id') || '';
    
    // ตอนนี้คุณสามารถใช้ questionId เพื่อค้นหาข้อมูลจาก backend หรือ mock data
    console.log("Question ID:", this.questionId);
  }
  questions = [
    {
      questionId: 1,
      topic: "How to learn Angular effectively?",
      detail: "I'm starting to learn Angular and wondering about the best practices to become proficient. Should I focus on the official documentation, or are there other resources that can help me accelerate my learning process? I'm also interested in learning about common mistakes to avoid as a beginner.",
    },
    {
      questionId: 2,
      topic: "What are Angular lifecycle hooks?",
      detail: "I've heard about lifecycle hooks in Angular, but I'm not sure how they work or when to use them. Can someone explain what they are, how they fit into the Angular component lifecycle, and provide examples of common lifecycle hooks used in real-world applications?",
    },
    {
      questionId: 3,
      topic: "Difference between Reactive and Template-driven forms",
      detail: "Can someone explain the difference between reactive forms and template-driven forms in Angular? What are the use cases for each, and which one should I choose based on different scenarios? I've been working with template-driven forms, but reactive forms seem to be more flexible.",
    },
    {
      questionId: 4,
      topic: "How to optimize Angular app performance?",
      detail: "My Angular application seems to slow down as the project grows. What are some best practices for optimizing the performance of an Angular app? I'm looking for ways to reduce loading times, improve responsiveness, and make my app more scalable for future features.",
    },
    {
      questionId: 5,
      topic: "Understanding Angular Dependency Injection",
      detail: "I'm having trouble fully understanding how dependency injection works in Angular. Can anyone explain the concept in simple terms, including how services are injected into components, and what problems it solves? Are there any pitfalls I should be aware of?",
    }
  ];
}