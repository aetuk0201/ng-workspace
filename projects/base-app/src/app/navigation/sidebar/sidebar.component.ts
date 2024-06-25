import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAlbum } from '../../albums/ialbum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  albums: IAlbum[] = [];
  
  constructor(private router: Router) { }

  onListAlbums() {

      this.router.navigate(['albums/list']);
  }

  onCreateAlbum() {
    this.router.navigate(['albums/wizard/createAlbum']);
  }

  onUploadPhotos(){
    this.router.navigate(['albums/uploadphotos']);
  }

}
