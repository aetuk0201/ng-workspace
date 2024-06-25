import { Component, Output, EventEmitter, ElementRef } from '@angular/core';
import { AlbumsService } from '../albums.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlbumNotificationService } from '../../shared/notification/album-notification.service';
import { IAlbum } from '../ialbum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-select',
  templateUrl: './album-select.component.html',
  styleUrls: ['./album-select.component.scss']
})
export class AlbumSelectComponent {
  albums: IAlbum[] = [];
  selectedAlbum: IAlbum | undefined;
  @Output() albumSelected = new EventEmitter<IAlbum>();

  get album() {
    return this.form.get('albumSelect');
  }

  form: FormGroup = new FormGroup({
    albumSelect: new FormControl('', {
      validators: [
        Validators.required
      ]
    })
  
  });
  
  constructor(private albumService: AlbumsService,
              private albumNotification: AlbumNotificationService,
              private router: Router) {   
     
    }
  
  async ngOnInit(): Promise<void> {
    this.albums = [];
    this.albums = await this.albumService.getAlbums();
  }

  // albumSelection() {

  //   // this.form.get("albumSelect").valueChanges.subscribe((value) => {
  //   //   this.selectedAlbum = value;
  //   // });
    
  //   this.selectedAlbum = this.form.get("albumSelect").value;
  //     if(this.selectedAlbum) {
  //       this.albumSelected.emit(this.selectedAlbum);
  //     }
     
  //  }


  selectChangeHandler() {

    this.selectedAlbum = this.form.get("albumSelect")?.value ?? null;
    console.log(this.selectedAlbum);
      
    if (this.selectedAlbum) {
          this.albumSelected.emit(this.selectedAlbum);
          this.albumNotification.selectedAlbum$.next(this.selectedAlbum);
        }
    
  }

  onCreateNewAlbum() {
    this.router.navigate(['albums/wizard/createAlbum']);
  }

}
