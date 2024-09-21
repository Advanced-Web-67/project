import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question/question.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-questions-edit',
  templateUrl: './questions-edit.component.html',
  styleUrls: ['./questions-edit.component.css']
})
export class QuestionsEditComponent implements OnInit {
  editQuestionForm!: FormGroup;
  questionId!: string;
  existingImage: string | null = null; // Variable to hold existing image

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.questionId = this.route.snapshot.paramMap.get('id') || ''; // Get question ID from the route
    this.initializeForm();
    this.loadQuestionData();
  }

  initializeForm(): void {
    this.editQuestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      body: ['', [Validators.required, Validators.minLength(30)]],
      tags: ['', [Validators.required]],
      image: [null] // For future use if needed
    });
  }

  loadQuestionData(): void {
    this.questionService.getQuestionById(this.questionId).subscribe(
      (response: any) => {
        this.existingImage = response.image; // Store the existing image
        this.editQuestionForm.patchValue({
          title: response.title,
          body: response.body,
          tags: response.tags,
          image: this.existingImage // You can set the existing image to form if needed
        });
      },
      error => {
        this.toastr.error('Error loading question data', 'Error');
        console.error('Error:', error);
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.editQuestionForm.patchValue({ image: reader.result }); // Update image base64 if needed
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.editQuestionForm.valid) {
      this.questionService.updateQuestion(this.questionId, this.editQuestionForm.value).subscribe(
        response => {
          this.toastr.success('Updated successfully!', 'Success');
          this.router.navigate(['/questions']); // Redirect after successful update
        },
        error => {
          this.toastr.error('Error updating question', 'Error');
          console.error('Error:', error);
        }
      );
    }
  }
}
