import { Component, Input } from '@angular/core';
import { IAlbum } from '../ialbum';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent {
  @Input() album: IAlbum | undefined;

    constructor() { }
  
  ngOnInit(): void {
      
  }

}
