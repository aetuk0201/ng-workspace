import { Component, Input } from '@angular/core';

interface IData {
  name: string;
  age: number;
  job: string;
} 

interface IHeader {
  key: string;
  label: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {
  @Input() data = new Array<IData>();
  @Input() headers = new Array<IHeader>();
  @Input() classNames = '';

  
}
