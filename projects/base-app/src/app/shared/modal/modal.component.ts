import { Component } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  constructor(public modalService: ModalService) { }
  
  isModalOpen(): boolean { 
    return this.modalService.isModalOpen();
  }

}
