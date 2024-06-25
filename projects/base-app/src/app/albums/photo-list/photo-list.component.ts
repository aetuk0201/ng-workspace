import { Component } from '@angular/core';
import { AlbumsService } from '../albums.service';
import { IPhoto } from '../iphoto';
import { IAlbum } from '../ialbum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent {
  photos: IPhoto[] = [];
  photo: IPhoto | null = null;
  album: IAlbum | null = null;
  albumId: string = '';

  constructor(private albumService: AlbumsService,
                private activatedRoute: ActivatedRoute) {
     
  }
  
  ngOnInit(): void {      
  
  }



}
