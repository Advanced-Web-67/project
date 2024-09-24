import { Component, OnInit } from '@angular/core';
import { QadataService } from '../../../services/profiles/qadata/qadata.service';

@Component({
  selector: 'app-c-summary',
  templateUrl: './c-summary.component.html',
  styleUrl: './c-summary.component.css'
})
export class CSummaryComponent implements OnInit{

  status!: boolean;
  textmore: string = "SHOWMORE";
  questions: any[] = [];
  answers: any[] = [];

  constructor(private qadata: QadataService){} 
  ngOnInit(): void {
      this.status = false;
      // this.qadata.getQuestions().subscribe(data => {
      //   this.questions = data;
      // });
  
      // this.qadata.getAnswers().subscribe(data => {
      //   this.answers = data;
      // });
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
