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
  
  status1!: boolean;
  status2!: boolean;
  status3!: boolean;
  status4!: boolean;
  status5!: boolean;
  status6!: boolean;
  status7!: boolean;
  status8!: boolean;
  status9!: boolean;
  status10!: boolean;
  
  questions: any[] = []; 
  selectedSubject: any[] = [];
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
        this.ngCheckselectSubject();
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

  ngCheck1() {
    this.status1 = !this.status1;
  }
  
  ngCheck2() {
    this.status2 = !this.status2;
  }
  
  ngCheck3() {
    this.status3 = !this.status3;
  }
  
  ngCheck4() {
    this.status4 = !this.status4;
  }
  
  ngCheck5() {
    this.status5 = !this.status5;
  }
  
  ngCheck6() {
    this.status6 = !this.status6;
  }
  
  ngCheck7() {
    this.status7 = !this.status7;
  }
  
  ngCheck8() {
    this.status8 = !this.status8;
  }
  
  ngCheck9() {
    this.status9 = !this.status9;
  }
  
  ngCheck10() {
    this.status10 = !this.status10;
  }

  ngCheckselectSubject() {
    const subjects: string[] = [];
    if (this.status1) subjects.push('สำนักวิชาวิทยาศาสตร์');
    if (this.status2) subjects.push('สำนักวิชาเทคโนโลยีสังคม');
    if (this.status3) subjects.push('สำนักวิชาเทคโนโลยีการเกษตร');
    if (this.status4) subjects.push('สำนักวิชาวิศวกรรมศาสตร์');
    if (this.status5) subjects.push('สำนักวิชาแพทยศาสตร์');
    if (this.status6) subjects.push('สำนักวิชาพยาบาลศาสตร์');
    if (this.status7) subjects.push('สำนักวิชาทันตแพทยศาสตร์');
    if (this.status8) subjects.push('สำนักวิชาสาธารณสุขศาสตร์');
    if (this.status9) subjects.push('สำนักวิชาศาสตร์และศิลป์ดิจิทัล');
    if (this.status10) subjects.push('อื่นๆ');
    
    if (subjects.length > 0) {
      this.selectedSubject = this.questions.filter((question: any) => subjects.includes(question.tags));
    } else {
      this.selectedSubject = this.questions;
    }
  }
}