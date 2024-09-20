import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-main',
  templateUrl: './comment-main.component.html',
  styleUrl: './comment-main.component.css'
})
export class CommentMainComponent implements OnInit{

  private userid = localStorage.getItem('userid');
  constructor(){}
  ngOnInit(): void {
  }
}
