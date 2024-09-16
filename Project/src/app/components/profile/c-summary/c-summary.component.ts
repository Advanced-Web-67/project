import { Component, OnInit } from '@angular/core';
import e from 'cors';

@Component({
  selector: 'app-c-summary',
  templateUrl: './c-summary.component.html',
  styleUrl: './c-summary.component.css'
})
export class CSummaryComponent implements OnInit{

  status!: boolean;
  textmore: string = "SHOWMORE";

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

  answer: any = [
    {"id":1,"text":"Go study fucker"},
    {"id":2,"text":"Go study fucker"},
    {"id":3,"text":"Go study fucker"},
    {"id":4,"text":"Go study fucker"},
    {"id":5,"text":"Go study fucker"},
    {"id":6,"text":"Go study fucker"},
    {"id":7,"text":"Go study fucker"},
    {"id":8,"text":"Go study fucker"},
    {"id":9,"text":"Go study fucker"},
    {"id":10,"text":"Go study fucker"},
  ]
  constructor(){} 
  ngOnInit(): void {
      this.status = false;
  }

  ngShowMore() {
    this.status = !this.status;
    if(this.status == true){
      this.textmore = "LESSMORE";
    }else{
      this.textmore = "SHOWMORE";
    }
  }

}
