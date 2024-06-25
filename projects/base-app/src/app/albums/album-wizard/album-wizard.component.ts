import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumNotificationService } from '../../shared/notification/album-notification.service';

@Component({
  selector: 'app-album-wizard',
  templateUrl: './album-wizard.component.html',
  styleUrls: ['./album-wizard.component.scss']
})
export class AlbumWizardComponent {
  isFormValid: boolean = false;
  showAlert = false;
  alertColor = 'info';
  alertMessage = '';
  displayAlert = false;

  @ViewChild('createAlbumLink', {static: true}) createAlbumLink: ElementRef | undefined;

  constructor(private router: Router,
            private albumNotification: AlbumNotificationService) { }

  ngOnInit(): void {

    this.albumNotification.isValidForm$.subscribe((isValid: boolean) => {
        this.isFormValid = isValid;     
        
          this.validateForm('createAlbum', false);
     });
  }

  validateForm(tabName: string, showAlert: boolean): void {

    if (tabName === 'createAlbum') {

      if(!this.isFormValid) {
        this.createAlbumLink?.nativeElement.classList.add('fa', 'fa-exclamation');

        this.alertColor = 'danger';
        this.alertMessage = 'Invalid form. Album Name and Description must be filled out before uploading photos.';
        this.showAlert = showAlert;
         this.router.navigate(['albums/wizard/createAlbum']);
      }
      else {
        this.createAlbumLink?.nativeElement.classList.remove('fa', 'fa-exclamation');
        //return true;
      }

    }

  }

  isValidForm(tabName: string): boolean {

    if (!tabName)
      return false;

    if (tabName === 'createAlbum') {
      return this.isFormValid;
    }

    return true;
  }

}
