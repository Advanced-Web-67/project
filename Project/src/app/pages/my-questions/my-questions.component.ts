import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrl: './my-questions.component.css'
})
export class MyQuestionsComponent implements OnInit{
  
  statusMath!: boolean;
  statusEnglish!: boolean;
  statusScience!: boolean;
  statusHistory!: boolean;

  questions: any = [
    {"id":"1","Q_name":"มทสมีอะไรกิน","Q_date":"2023-09-01","subject":"Math"},
    {"id":"1925","Q_name":"ข้อนี้ทำยังไง","Q_date":"2023-08-15","subject":"Science"},
    {"id":"1969","Q_name":"อย่าให้มีครั้งที่2","Q_date":"2023-07-30","subject":"History"},
    {"id":"1970","Q_name":"dif","Q_date":"2023-06-21","subject":"Math"},
    {"id":"1972","Q_name":"GGEZ","Q_date":"2023-05-12","subject":"English"},
    {"id":"1973","Q_name":"แทงหวย","Q_date":"2023-04-09","subject":"Science"},
    {"id":"1976","Q_name":"Shylu","Q_date":"2023-03-28","subject":"Math"},
    {"id":"1977","Q_name":"8221","Q_date":"2023-02-14","subject":"History"},
    {"id":"1981","Q_name":"111test","Q_date":"2023-01-31","subject":"English"},
    {"id":"1996","Q_name":"test-709","Q_date":"2022-12-25","subject":"Science"},
    {"id":"1997","Q_name":"test-654","Q_date":"2022-11-18","subject":"Math"},
    {"id":"1999","Q_name":"test-127","Q_date":"2022-10-09","subject":"History"},
    {"id":"2001","Q_name":"test-301","Q_date":"2022-09-02","subject":"English"},
    {"id":"2003","Q_name":"1769","Q_date":"2022-08-11","subject":"Science"}
  ]

  selectedSubject: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.statusMath = false;
    this.statusEnglish = false;
    this.statusScience = false;
    this.statusHistory = false;

    this.selectedSubject = this.questions;
  }

  ngCheckMath(){
    this.statusMath = !this.statusMath 
  }
  ngCheckEnglish(){
    this.statusEnglish = !this.statusEnglish
  }
  ngCheckScience(){
    this.statusScience = !this.statusScience
  }
  ngCheckHistory(){
    this.statusHistory = !this.statusHistory
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
