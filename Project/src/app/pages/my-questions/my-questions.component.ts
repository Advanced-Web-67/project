import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { QuestionService } from '../../services/question/question.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.css'] // corrected the property to 'styleUrls'
})
export class MyQuestionsComponent implements OnInit{
  
  statusMath!: boolean;
  statusEnglish!: boolean;
  statusScience!: boolean;
  statusHistory!: boolean;
  selectedSubject: any[] = [];
  questions: any[] = []; 
  user_id!: string  // Replace with the actual user ID

  constructor(private questionService: QuestionService, private toastr: ToastrService,private router: Router) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const userid = localStorage.getItem('userid');
      if (userid) {
        this.user_id = userid;
      } else {
        this.toastr.error('กรุณาเข้าสู่ระบบก่อน!', 'Unauthorized');
        return; // Exit if not authorized
      }
    }
    console.log(this.user_id)
    this.loadUserQuestions();
  }

  loadUserQuestions(): void {
    this.questionService.getQuestionsByUserId(this.user_id).subscribe(
      (response: { questions: any[] }) => {
        console.log('Loaded questions:', response);
        this.questions = response.questions || []; // ตรวจสอบให้แน่ใจว่า questions มีค่าเป็น Array
      },
      error => {
        console.error('Error loading questions', error);
      }
    );
  }

  editQuestion(questionId: string): void {
    this.router.navigate(['/questions/edit', questionId]); // Navigate to the edit page with the question ID
  }

  deleteQuestion(questionId: string): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionService.deleteQuestion(questionId).subscribe(
        response => {
          this.toastr.success('Question deleted successfully!', 'Success');
          // Reload the questions after deletion
          this.loadUserQuestions();
        },
        error => {
          this.toastr.error('Error deleting question', 'Error');
          console.error('Error:', error);
        }
      );
    }
  }

  ngCheckMath() {
    this.statusMath = !this.statusMath;
  }
  
  ngCheckEnglish() {
    this.statusEnglish = !this.statusEnglish;
  }
  
  ngCheckScience() {
    this.statusScience = !this.statusScience;
  }
  
  ngCheckHistory() {
    this.statusHistory = !this.statusHistory;
  }

  ngCheckselectSubject() {
    const subjects: string[] = [];
    
    if (this.statusEnglish) subjects.push('English');
    if (this.statusScience) subjects.push('Science');
    if (this.statusHistory) subjects.push('History');
    if (this.statusMath) subjects.push('Math');
    
    if (subjects.length > 0) {
      this.selectedSubject = this.questions.filter((question: any) => subjects.includes(question.subject));
    } else {
      this.selectedSubject = this.questions;
    }
  }
}
