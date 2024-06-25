import { Component, Input } from '@angular/core';
import { faPlus, faPlusCircle , faMinusCircle} from '@fortawesome/free-solid-svg-icons';

export interface AccordionItem {
  menuHeader: string;
  menuItems: menuItems[];
}

export interface menuItems { 
  item: string;
}
@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
  
export class AccordionComponent {
  @Input() menuitems = new Array<AccordionItem>();
  openedItemIndex: number = -1;
  faPlus = faPlus;
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  isOpen = false;

  constructor() { }
  
  ngOnInit(): void {
    console.log(this.menuitems);
  }

  onClick(index: number) {
    if (this.openedItemIndex === index) {
      this.openedItemIndex = -1;
      this.isOpen = !this.isOpen;
    } else {
      this.openedItemIndex = index;
      this.isOpen = true;
    }
  }

  onClickPlus(index: number) {
    this.openedItemIndex = index;
    this.isOpen = true;
  }

  onClickMinus(index: number) {
     if (this.openedItemIndex === index) {
       this.openedItemIndex = -1;
       this.isOpen = !this.isOpen;
    }
  }

}
