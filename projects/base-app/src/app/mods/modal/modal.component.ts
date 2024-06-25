import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(private el: ElementRef) {
    
  }

  ngOnInit() {
    //document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy() {
    //document.body.removeChild(this.el.nativeElement);
  }

}
