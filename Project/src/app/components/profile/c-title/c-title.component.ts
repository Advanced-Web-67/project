import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../../services/profiles/image/image.service';

@Component({
  selector: 'app-c-title',
  templateUrl: './c-title.component.html',
  styleUrl: './c-title.component.css'
})
export class CTitleComponent implements OnInit{

  image: string | ArrayBuffer | null = '';  // Image to display
  defaultImage: string = 'https://www.shareicon.net/data/256x256/2016/05/24/770117_people_512x512.png';  // Default image URL

  displayName!: string;  // Default display name

  constructor(private imageService: ImageService) {}  // Inject the image service

  ngOnInit() {
    // Subscribe to the image observable
    this.imageService.currentImage.subscribe(image => {
      this.image = image ? image : this.defaultImage;  // Use default image if no image is uploaded
    });
    // Subscribe to display name observable
    this.imageService.currentDisplayName.subscribe(displayName => {
      this.displayName = displayName ? displayName : 'DisplayName';  // Default to 'Name' if no display name is provided
    });
  }

}
