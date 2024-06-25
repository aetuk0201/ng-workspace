import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() color = 'blue';
  @Input() theme = 'info';
  
  get bgColor() {
    return `bg-${this.color}`;
  }

  get bgTheme() {
    return `bg-${this.theme}-400`;
  }
  constructor() { }

  ngOninit(): void { }


}
