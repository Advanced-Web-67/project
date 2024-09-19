import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../../services/profiles/image/image.service';
import { UserdataService } from '../../../services/profiles/userdata/userdata.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-c-edit',
  templateUrl: './c-edit.component.html',
  styleUrl: './c-edit.component.css'
})
export class CEditComponent implements OnInit{

  private user_id: string | null = '';
  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    about: new FormControl(''),
    picture: new FormControl('')
  });
  constructor (private imageService: ImageService,private userdata: UserdataService){  } // Inject the image service
  
  ngOnInit(): void {
    this.userdata.currentUserId.subscribe(user_id => {
      this.user_id = user_id;
    });

    this.userdata.getUser(this.user_id).subscribe(user => {
      this.profileForm.patchValue({
        username: user.username,
        about: user.about,
        email: user.email,
        password: user.password,
        picture: user.picture // Assuming picture is stored as a base64 string
      });
      this.imageService.updateImage(user.picture);
    });
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
    console.log('Confirmed!');
    // Perform actions for confirmation
  }
}
