import { Component } from '@angular/core';
import { IAlbum } from '../ialbum';

@Component({
  selector: 'app-upload-photos',
  templateUrl: './upload-photos.component.html',
  styleUrls: ['./upload-photos.component.scss']
})
export class UploadPhotosComponent {
  album: IAlbum | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  onAlbumSelected(event: IAlbum | undefined) {
    console.log('upload photos component: ', event);
    this.album = event;
  }

}
