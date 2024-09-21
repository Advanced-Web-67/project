import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question/question.service';

@Component({
  selector: 'app-q-main',
  templateUrl: './q-main.component.html',
  styleUrls: ['./q-main.component.css'],
})
export class QMainComponent implements OnInit {
  questions: any[] = []; // ตั้งค่าเริ่มต้นเป็น Array
  filteredQuestions: any[] = []; // ตั้งค่าตัวแปรสำหรับกรองคำถาม

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getAllQuestions().subscribe(
      (response: { questions: any[] }) => {
        console.log('Loaded questions:', response);
        this.questions = response.questions || []; // ตรวจสอบให้แน่ใจว่า questions มีค่าเป็น Array
        this.filteredQuestions = this.questions; // กำหนดให้ filteredQuestions เป็น questions ทั้งหมด
      },
      (error) => {
        console.error('Error loading questions', error);
      }
    );
  }

  onFilter(tag: string) {
    this.questionService.filterQuestions(tag).subscribe(
      (data: any[]) => {
        this.questions = data; // เก็บข้อมูลที่กรองแล้ว
      },
      (error) => {
        console.error('Error filtering questions', error);
      }
    );
  }
}
