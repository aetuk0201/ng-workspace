
import { Component } from '@angular/core';
import { AlbumsService } from '../albums.service';
import { AlbumNotificationService } from '../../shared/notification/album-notification.service';
import { IPhoto } from '../iphoto';
import { IAlbum } from '../ialbum';


@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent {
  albums: IAlbum[] = [];
  photo: IPhoto | null = null;
  photos: IPhoto[] = [];
  imgUrl: string = '';

  constructor(private albumService: AlbumsService, private albumNotification: AlbumNotificationService) {
     this.albumNotification.selectedAlbum$.subscribe((album) => {
        console.log('from album list: ', album);
      });
   }

  async ngOnInit(): Promise<void> {
    this.albums = [];
    this.albums = await this.albumService.getAlbums();

    console.log('=======================');

    // const photos = await this.albumService.getPhotosByAlbumId('229f77b0-5502-45f0-a226-5769d92801d9');   
    // this.photos = photos;
    // console.log(this.photos);
    
    // const img = await this.albumService.getPhotoById('ad070dbf-2255-464d-836a-df5ba801f283');
    // console.log(img.Items[0]['urlLink']['S']);

    // let imgDecoded = Helper.decodeBase64String(img.Items[0]['urlLink']['S']);
    // console.log(imgDecoded);
    // this.imgUrl = 'data:image/jpg;base64,' + img.Items[0]['urlLink']['S']; //imgDecoded;
  }

  onAlbumSelected(event: any) {
    console.log(event);
  }

}
