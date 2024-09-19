import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question/question.service';
import { UserdataService } from '../../../services/profiles/userdata/userdata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-question-detail',
  templateUrl: './questions-detail.component.html',
  styleUrls: ['./questions-detail.component.css'],
})
export class QuestionsDetailComponent implements OnInit {
  createAnswerForm!: FormGroup;

  question: any;
  username!: string;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private userService: UserdataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadQuestion(id);
      }
    });
  }

  loadQuestion(id: string): void {
    this.questionService.getQuestionById(id).subscribe(
      question => {
        this.question = question;
        
        // หลังจากดึงข้อมูลคำถามแล้ว เรียกข้อมูลผู้ใช้จาก user_id
        this.userService.getUser(question.user_id).subscribe(
          user => {
            this.username = user.username; // เก็บ username ที่ได้จากผู้ใช้
          },
          error => {
            console.error('Error loading user', error);
          }
        );
      },
      error => {
        console.error('Error loading question', error);
      }
    );
  }
}
