import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../../services/profiles/image/image.service';

@Component({
  selector: 'app-c-edit',
  templateUrl: './c-edit.component.html',
  styleUrl: './c-edit.component.css'
})
export class CEditComponent implements OnInit{

  displayName: string = '';  // Local display name
  constructor (private imageService: ImageService){  } // Inject the image service
  
  ngOnInit(): void {
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      // Read the file as a data URL
      reader.onload = () => {
        const imageBase64 = reader.result;  // Get the base64 string
        this.imageService.updateImage(imageBase64);  // Send image to the service
      };

      reader.readAsDataURL(file);  // Converts the file to a base64 string
    }
  }

  // Update display name in the service whenever the user types
  onDisplayNameChange(event: any) {
    this.displayName = event.target.value;
    this.imageService.changeDisplayName(this.displayName);
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
