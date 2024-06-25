import { Component } from '@angular/core';
import { Album } from '../album';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Helper } from '../../shared/helper';
import { AlbumNotificationService } from '../../shared/notification/album-notification.service';
import { AlbumsService } from '../albums.service';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss']
})
export class CreateAlbumComponent {
  album = new Album('', '', '');
  showAlert = false;
  alertColor = 'info';
  alertMessage = '';
  isSuccess = false;
  isCreateAlbum: boolean = true;
  albumStyle = {
    'font-size': '1.2rem',
    'font-weight': 500
  }

  albumName = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
  ]);

  description = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(50)
  ]);

  albumForm = new FormGroup({
    albumName: this.albumName,
    description: this.description 
  });



  constructor(private router: Router,
    private albumsService: AlbumsService,
    private albumNotification: AlbumNotificationService
  ) {

    if (this.router.getCurrentNavigation()?.previousNavigation) { 
        this.album = this.router.getCurrentNavigation()?.extras?.state?.['album'] ?? null;
        this.albumName.setValue(this.album?.title ?? null);
        this.description.setValue(this.album?.description ?? null);
    }

  }

  ngOnInit(): void { 

    this.albumForm.statusChanges.subscribe(() => {
      this.albumNotification.isValidForm$.next(this.albumForm.valid);
    });
      
  }

  async onNext(): Promise<void> {

    if (this.albumForm.valid) { 

      this.isCreateAlbum = false;

      this.album = {
        albumId: uuid(),
        title: this.albumName.value ?? '',
        description: this.description.value ?? '',
        owner: 'ae',
        createdAt: Helper.getLocalDateTimeString(),
        updatedAt: Helper.getLocalDateTimeString()
      };

      let albumResponse = await this.albumsService.createAlbum(this.album);

      if (!albumResponse) { 
        this.alertColor = 'danger';
        this.alertMessage = 'An error occurred while creating the album. Please try again.';
        this.showAlert = true;
        return;
      }
      
      //send album to file upload component
      this.isSuccess = true;
      //this.router.navigateByUrl('albums/wizard/photoUpload', { state: { album: this.album } });
      this.router.navigate(['albums/wizard/photoUpload'], { state: { album: this.album } });

    } else {   
     
      this.isSuccess = false;
      this.alertColor = 'danger';
      this.alertMessage = 'The form contains invalid entries. Please correct and try again.';
      this.showAlert = true;
      
    }

    
  }


}
