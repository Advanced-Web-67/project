import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../../services/profiles/image/image.service';
import { UserdataService } from '../../../services/profiles/userdata/userdata.service';

@Component({
  selector: 'app-c-title',
  templateUrl: './c-title.component.html',
  styleUrl: './c-title.component.css'
})
export class CTitleComponent implements OnInit{

  private user_id: string = '66e82b40b41581cda1840e94';
  username: string = '';
  picture: string = '';

  image: string | ArrayBuffer | null = '';  // Image to display
  defaultImage: string = this.picture;  // Default image URL

  displayName: string = this.username;  // Default display name

  constructor(private imageService: ImageService, private userdata: UserdataService) {}  // Inject the image service

  ngOnInit() {
    this.userdata.setUserId(this.user_id);

    this.userdata.getUser(this.user_id).subscribe(user => {
      this.username = user.username;
      this.picture = user.picture; // Assuming picture is stored as a base64 string
      this.defaultImage = user.picture;
      this.displayName = user.username;
    });
    // Subscribe to the image observable
    this.imageService.currentImage.subscribe(image => {
      this.image = image ? image : this.defaultImage;  // Use default image if no image is uploaded
    });
    // Subscribe to display name observable
    this.imageService.currentUsername.subscribe(username => {
      this.displayName = username ? username : this.displayName;  // Default to 'Name' if no display name is provided
    });
  }

}
