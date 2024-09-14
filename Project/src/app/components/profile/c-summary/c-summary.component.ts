import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-summary',
  templateUrl: './c-summary.component.html',
  styleUrl: './c-summary.component.css'
})
export class CSummaryComponent implements OnInit{

  status!: boolean;
  questions: any = [
    {"id":1,"title":"Why i am stupid","body":"Hello....","tag":"monkey"},
    {"id":2,"title":"Why i am stupid","body":"Hello....","tag":"monkey"},
    {"id":3,"title":"Why i am stupid","body":"Hello....","tag":"monkey"},
    {"id":4,"title":"Why i am stupid","body":"Hello....","tag":"monkey"},
    {"id":5,"title":"Why i am stupid","body":"Hello....","tag":"monkey"},
    {"id":6,"title":"Why i am stupid","body":"Hello....","tag":"monkey"},
    {"id":7,"title":"Why i am stupid","body":"Hello....","tag":"monkey"},
    {"id":8,"title":"Why i am stupid","body":"Hello....","tag":"monkey"},
    {"id":9,"title":"Why i am stupid","body":"Hello....","tag":"monkey"},
    {"id":10,"title":"Why i am stupid","body":"Hello....","tag":"monkey"},
  ]

  constructor(){} 
  ngOnInit(): void {
      this.status = false;
  }

  ngShowMore() {
    this.status = !this.status;
  }

}
