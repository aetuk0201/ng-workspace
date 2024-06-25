import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IPhoto } from '../iphoto';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {
  @Input() photo: IPhoto | null = null;
  @ViewChild('pic') pic: ElementRef | undefined;  
  @Output() photoClick = new EventEmitter<boolean>();
  active: boolean = false;

  constructor() { }

  onPhotoClick() {
    this.pic?.nativeElement.classList.add('popup');
  }

  toggleActive() {
    
    if (this.active) {
      this.pic?.nativeElement.classList.add('popup');
    } else {
      this.pic?.nativeElement.classList.remove('popup');
    }

    this.active = !this.active;
    this.photoClick.emit(this.active)
  }
}
