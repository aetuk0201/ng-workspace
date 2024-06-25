import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collections-home',
  templateUrl: './collections-home.component.html',
  styleUrls: ['./collections-home.component.css']
})
  

export class CollectionsHomeComponent implements OnInit {
  items: any[] = [];
  pageOfItems?: Array<any>;
  sortProperty: string = 'id';
  sortOrder = 1;
  loading = false;
  
  data = [
    { name: 'James', age: 24, job: 'Designer' },
    { name: 'Pete', age: 26, job: 'Engineer' },
    { name: 'Elyse', age: 25, job: 'Engineer' }
  ];

  headers = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'job', label: 'Job' }
  ];

  classNames = 'table table-striped table-hover table-bordered';

  constructor() { }

  ngOnInit() {
  }

  
    onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.pageOfItems = pageOfItems;
    }

    sortBy(property: string) {
        this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
        this.sortProperty = property;
        this.data = [...this.data.sort((a: any, b: any) => {
            // sort comparison function
            let result = 0;
            if (a[property] < b[property]) {
                result = -1;
            }
            if (a[property] > b[property]) {
                result = 1;
            }
            return result * this.sortOrder;
        })];
    }

    sortIcon(property: string) {
        if (property === this.sortProperty) {
            return this.sortOrder === 1 ? '☝️' : '👇';
        }
        return '';
    }
  
}
