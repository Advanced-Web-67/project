import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../../services/profiles/comment/comment.service';
import { UserdataService } from '../../../services/profiles/userdata/userdata.service';

@Component({
  selector: 'app-comment-main',
  templateUrl: './comment-main.component.html',
  styleUrls: ['./comment-main.component.css']
})
export class CommentMainComponent implements OnInit {
  userPicture: string = '';
  commentForm: FormGroup;
  comments: Array<{
    _id:string;
    commentText: string;
    user_id: string;
    user_comment_id: string;
    picture: string;
    username: string;
  }> = [];
  commentUserId: string = '';
  logedUserId: string | null = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private userService: UserdataService
  ) {
    this.commentForm = this.fb.group({
      commentText: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.commentUserId = id;
      }
    });
    this.logedUserId = localStorage.getItem('userid');
    this.loadComments();
    this.getUserPicture(localStorage.getItem('userid'));
  }

  getUserPicture(userId: string|null): void {
    this.userService.getUserPictures(userId).subscribe(
      (user) => {
        this.userPicture = user.picture; // Wrap the picture string in an array
      },
      (error) => {
        console.error('Error fetching user picture:', error);
      }
    );
  }
  

  onSubmit(): void {
    if (this.commentForm.valid) {
      const commentData = {
        commentText: this.commentForm.value.commentText,
        user_id: this.commentUserId,
        picture: this.userPicture,
        username: localStorage.getItem('username'), 
        user_comment_id: localStorage.getItem('userid')
      };
      console.log(commentData);
      this.commentService.createComment(commentData).subscribe(
        (response) => {
          this.comments.push(response);
          this.commentForm.reset();
        },
        (error) => {
          console.error('Error submitting comment:', error);
        }
      );
    }
  }

  loadComments(): void {
    this.commentService.getCommentsByUserId(this.commentUserId).subscribe(
      (data) => {
        this.comments = data;
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }

  deleteComment(commentId: string, index: number): void {
    this.commentService.deleteComment(commentId).subscribe(
      (response) => {
        this.comments.splice(index, 1); // Remove comment from array after successful deletion
        alert("Remove Success");
      },
      (error) => {
        console.error('Error deleting comment:', error);
      }
    );
  }
}
