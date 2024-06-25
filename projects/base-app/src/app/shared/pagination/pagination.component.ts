import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

  export interface Pager {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: number[];
  }

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent {
  @Input() items?: Array<any>;
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 10;
  @Input() maxPages = 10;

  pager?: Pager;

  ngOnChanges(changes: SimpleChanges) {
    // set page when items array first set or changed    
        if (changes['items'].currentValue !== changes['items'].previousValue) {
            this.setPage(this.initialPage);
        }
  }

      setPage(page: number) {
        if (!this.items?.length)
            return;

        // get new pager object for specified page
        this.pager = this.paginate(this.items.length, page, this.pageSize, this.maxPages);

        // get new page of items from items array
        const pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);

        // call change page function in parent component
        this.changePage.emit(pageOfItems);
    }

    paginate(totalItems: number, currentPage: number = 1, pageSize: number = 10, maxPages: number = 10): Pager {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;
        if (totalPages <= maxPages) {
            // total pages less than max so show all pages
            startPage = 1;
            endPage = totalPages;
        } else {
            // total pages more than max so calculate start and end pages
            let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
            let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
            if (currentPage <= maxPagesBeforeCurrentPage) {
                // current page near the start
                startPage = 1;
                endPage = maxPages;
            } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                // current page near the end
                startPage = totalPages - maxPages + 1;
                endPage = totalPages;
            } else {
                // current page somewhere in the middle
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages
        };
    }   

}


// export class AppComponent {
//     items: any[] = [];
//     pageOfItems?: Array<any>;
//     sortProperty: string = 'id';
//     sortOrder = 1;
//     loading = false;

//     constructor(private http: HttpClient) { }

//     ngOnInit() {
//         // fetch items from the backend api
//         this.loading = true;
//         this.http.get<any[]>('/items')
//             .subscribe(x => {
//                 this.items = x;
//                 this.loading = false;
//             });
//     }

//     onChangePage(pageOfItems: Array<any>) {
//         // update current page of items
//         this.pageOfItems = pageOfItems;
//     }

//     sortBy(property: string) {
//         this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
//         this.sortProperty = property;
//         this.items = [...this.items.sort((a: any, b: any) => {
//             // sort comparison function
//             let result = 0;
//             if (a[property] < b[property]) {
//                 result = -1;
//             }
//             if (a[property] > b[property]) {
//                 result = 1;
//             }
//             return result * this.sortOrder;
//         })];
//     }

//     sortIcon(property: string) {
//         if (property === this.sortProperty) {
//             return this.sortOrder === 1 ? '☝️' : '👇';
//         }
//         return '';
//     }
//}
