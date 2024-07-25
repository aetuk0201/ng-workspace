import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ModalService } from './modal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent {
  @Input() id?: string;
  isOpen = false;
  private element: any;

  constructor(private modalService: ModalService, private el:ElementRef) {
    this.element = el.nativeElement;
   }

   ngOnInit(): void {

    // add self (this modal instance) to the modal service so it can be opened from any component
    this.modalService.add(this);

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el: any) => {
        if (el.target.className === 'app-modal') {
            this.close();
        }
    });
   }
  
  isModalOpen(): boolean { 
    return this.modalService.isModalOpen();
  }

  open() {
      this.element.style.display = 'block';
      document.body.classList.add('app-modal-open');
      this.isOpen = true;
  }

  close() {
      this.element.style.display = 'none';
      document.body.classList.remove('app-modal-open');
      this.isOpen = false;
  }

  ngOnDestroy() {
      // remove self from modal service
      this.modalService.remove(this);

      // remove modal element from html
      this.element.remove();
  }


}
