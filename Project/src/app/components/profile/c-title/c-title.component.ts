import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from '../../../services/profiles/image/image.service';
import { UserdataService } from '../../../services/profiles/userdata/userdata.service';

@Component({
  selector: 'app-c-title',
  templateUrl: './c-title.component.html',
  styleUrl: './c-title.component.css'
})
export class CTitleComponent implements OnInit{

  @Input() useridfromparant!: string;
  tempuserid: string | null = '';
  private user_id: string | null = null;
  username: string = '';

  email: string = '';
  displayEmail: string = this.email;

  image: string | ArrayBuffer | null = '';  // Image to display
  defaultImage: string | ArrayBuffer | null = this.image;  // Default image URL

  displayName: string = this.username;  // Default display name

  constructor(private imageService: ImageService, private userdata: UserdataService) {}  // Inject the image service

  ngOnInit() {
    if(this.useridfromparant){
      this.user_id = this.useridfromparant;
    }else{
      this.user_id = localStorage.getItem('userid');
    }
    this.tempuserid = localStorage.getItem('userid');
    this.userdata.setUserId(this.user_id);

    this.userdata.getUser(this.user_id).subscribe(user => {
      this.username = user.username;
      this.image = user.picture; // Assuming picture is stored as a base64 string
      this.email = user.email;

      this.displayEmail = user.email;
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
    // Subscribe to display email observable
    this.imageService.currentEmail.subscribe(emailname => {
      this.displayEmail = emailname ? emailname : this.displayEmail;  // Default to 'Name' if no display name is provided
    });
  }

}
