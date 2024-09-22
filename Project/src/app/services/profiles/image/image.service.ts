import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private imageSource = new BehaviorSubject<string | ArrayBuffer | null>(null);
  currentImage = this.imageSource.asObservable();

  private UsernameSource = new BehaviorSubject<string>('');  // Observable for Display Name
  currentUsername = this.UsernameSource.asObservable();

  private EmailSource = new BehaviorSubject<string>('');  // Observable for Display Email
  currentEmail = this.EmailSource.asObservable();

  constructor() { }

  // Set image
  updateImage(image: string | ArrayBuffer | null) {
    this.imageSource.next(image);
  }

  // Set username
  changeUsername(username: string) {
    this.UsernameSource.next(username);
  }

  // Set email
  changeEmail(emailname: string) {
    this.EmailSource.next(emailname);
  }
}
