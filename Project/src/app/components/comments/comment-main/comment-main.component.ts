import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../../../services/profiles/comment/comment.service';
import { UserdataService } from '../../../services/profiles/userdata/userdata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment-main',
  templateUrl: './comment-main.component.html',
  styleUrls: ['./comment-main.component.css']
})
export class CommentMainComponent implements OnInit {
  userPicture: string = '';
  commentForm: FormGroup;
  comments: Array<{
    _id: string;
    commentText: string;
    user_id: string;
    user_comment_id: string;
    picture: string;
    username: string;
  }> = [];
  commentUserId: string = '';
  logedUserId: string | null = '';
  commentToDeleteId: string = ''; // Store comment ID to delete
  commentIndexToDelete: number = -1; // Store index of comment to delete
  modals!: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private userService: UserdataService,
    private toastr: ToastrService,
    private router: Router
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

    const modal = new (window as any).bootstrap.Modal(document.getElementById('deleteModal'));
    this.modals = modal;
  }

  getUserPicture(userId: string | null): void {
    this.userService.getUserPictures(userId).subscribe(
      (user) => {
        this.userPicture = user.picture;
      },
      (error) => {
        console.error('Error fetching user picture:', error);
      }
    );
  }

  onSubmit(): void {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // ถ้าไม่มี token, นำทางไปที่หน้า login
      this.router.navigate(['/login']);
      return;
    }

    if (this.commentForm.valid) {
      const commentData = {
        commentText: this.commentForm.value.commentText,
        user_id: this.commentUserId,
        picture: this.userPicture,
        username: localStorage.getItem('username'),
        user_comment_id: localStorage.getItem('userid')
      };
      this.commentService.createComment(commentData).subscribe(
        (response) => {
          this.comments.push(response);
          this.toastr.success('แสดงความคิดเห็นสำเร็จ', 'Success');
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
        // console.log('Error fetching comments:', error);
      }
    );
  }

  openDeleteModal(commentId: string, index: number): void {
    this.commentToDeleteId = commentId;
    this.commentIndexToDelete = index;
    this.modals.show();
  }

  confirmDelete(): void {
    if (this.commentToDeleteId) {
      this.commentService.deleteComment(this.commentToDeleteId).subscribe(
        (response) => {
          this.comments.splice(this.commentIndexToDelete, 1); // Remove comment from array
          this.modals.hide();
          this.toastr.error('ลบความคิดเห็นสำเร็จ', 'Success');
        },
        (error) => {
          console.error('Error deleting comment:', error);
        }
      );
    }
  }
}
