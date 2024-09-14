import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private imageSource = new BehaviorSubject<string | ArrayBuffer | null>(null);
  currentImage = this.imageSource.asObservable();

  private displayNameSource = new BehaviorSubject<string>('');  // Observable for Display Name
  currentDisplayName = this.displayNameSource.asObservable();

  constructor() { }

  // Set image
  updateImage(image: string | ArrayBuffer | null) {
    this.imageSource.next(image);
  }

  // Set username
  changeDisplayName(displayName: string) {
    this.displayNameSource.next(displayName);
  }
}
