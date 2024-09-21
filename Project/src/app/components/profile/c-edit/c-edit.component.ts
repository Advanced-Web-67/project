import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../../services/profiles/image/image.service';
import { UserdataService } from '../../../services/profiles/userdata/userdata.service';
import { CommentService } from '../../../services/profiles/comment/comment.service';
import { FormControl, FormGroup, Validators, AbstractControl  } from '@angular/forms';

@Component({
  selector: 'app-c-edit',
  templateUrl: './c-edit.component.html',
  styleUrl: './c-edit.component.css'
})
export class CEditComponent implements OnInit{

  
  private user_id: string | null = '';
  password: string = '';
  profileForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    newpassword: new FormControl('',[Validators.minLength(6)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    about: new FormControl(''),
    picture: new FormControl(''),
    confirm: new FormControl('')
  });

  constructor ( private imageService: ImageService,
                private userdata: UserdataService,
                private commentPictureservice: CommentService){  } // Inject the image service

  
  ngOnInit(): void {
    this.userdata.currentUserId.subscribe(user_id => {
      this.user_id = user_id;
    });

    this.userdata.getUser(this.user_id).subscribe(user => {
      this.profileForm.patchValue({
        username: user.username,
        about: user.about,
        email: user.email,
        picture: user.picture // Assuming picture is stored as a base64 string
      });
      this.imageService.updateImage(user.picture);
      this.password = user.password;
    });
    this.profileForm.get('confirm')?.setValidators(this.matchPassword.bind(this));
  }

  matchPassword(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = this.profileForm.get('newpassword')?.value;
    if (control.value !== newPassword) {
      return { mismatch: true };
    }
    return null;
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      // Read the file as a data URL
      reader.onload = () => {
        const imageBase64 = reader.result as string;  // Get the base64 string
        this.imageService.updateImage(imageBase64);  // Send image to the service
        this.profileForm.get('picture')?.setValue(imageBase64);  // Update the form control
      };
      
      reader.readAsDataURL(file);  // Converts the file to a base64 string
    }
  }

  // Update display name in the service whenever the user types
  onUsernameChange(event: any) {
    const newUsername = event.target.value;
  this.profileForm.get('username')?.setValue(newUsername);  // Update form control value
  this.imageService.changeUsername(newUsername);  // Send updated username to the service
  }

  openModal() {
    const modal = new (window as any).bootstrap.Modal(document.getElementById('customModal'));
    modal.show();
  }
  confirm() {
    if (this.profileForm.valid) {
      const updatedUserData = this.profileForm.value;
      
      // Call your userdata service to update the user data
      this.userdata.updateUser(this.user_id, updatedUserData).subscribe(
        response => {
          console.log('User profile updated successfully', response);
          alert('แก้ไขข้อมูลเสร็จสิ้น');
        },
        error => {
          console.error('Error updating profile', error);
          alert('ไม่สามารถแก้ไขข้อมูลได้โปรดลองอีกครั้ง');
        }
      );
      this.commentPictureservice.updateCommentPicture(localStorage.getItem('userid'), this.profileForm.value.picture).subscribe(
        (response) => {
          console.log('Picture updated successfully', response);
          // You can reload the comments or handle the UI as needed
        },
        (error) => {
          console.error('Error updating picture:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
