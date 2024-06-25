import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPhoto } from '../iphoto';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.scss']
})
export class PhotoPreviewComponent {
  @Input() photo: IPhoto | null = null;
  @Output() toggleOpen = new EventEmitter<boolean>();
  @Input() open:boolean = false;
  
  constructor() { }

  onClose() {
    this.open = false;

    this.toggleOpen.emit(this.open);
  }
}
