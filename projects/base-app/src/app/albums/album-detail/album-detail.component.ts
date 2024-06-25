import { AlbumsService } from '../../albums/albums.service';
import { Component } from '@angular/core';
import { IPhoto } from '../iphoto';
import { IAlbum } from '../ialbum';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ModalService } from '../../shared/modal/modal.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent {
  photos: IPhoto[] = [];
  photo: IPhoto | null = null;
  album: IAlbum | null = null;
  albumId: string | undefined;
  active: boolean = false;
  isOpen: boolean = false;

  constructor(private router: Router,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute,
    private AlbumsService: AlbumsService) { 
    
   }

  ngOnInit(): void {
    
    this.activatedRoute.paramMap.subscribe((params) => {
      this.albumId = params.get('albumId') ?? undefined;
      if (this.albumId) {
        this.getPhotosByAlbumId(this.albumId);
      }
    });

  }

  async getPhotosByAlbumId(albumId: string) {
    this.photos = await this.AlbumsService.getPhotosByAlbumId(albumId);    
  }

  openPhoto() {
    this.isOpen = !this.isOpen;
  }

  openModal($event: Event) {
    $event.preventDefault();
    
     this.modalService.toggleModal();
  }

  onPhotoClick($event: Event) {
    $event.preventDefault();

     this.isOpen = !this.isOpen;
  }

  toggle() {

    this.active = !this.active;
  }
}
