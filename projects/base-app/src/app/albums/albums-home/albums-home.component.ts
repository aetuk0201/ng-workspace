import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-albums-home',
  templateUrl: './albums-home.component.html',
  styleUrls: ['./albums-home.component.css']
})
export class AlbumsHomeComponent {
  isValidate: boolean = false;

  constructor() { 
    
  }

  ngOnInit(): void { 

  }

  isValid(path?: string): boolean {
    // this.validate();
    // if (path) {
    //   return this.dataIsValid[path];
    // }
    // return (this.dataIsValid &&
    //   Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));

    return true;
  }

}
