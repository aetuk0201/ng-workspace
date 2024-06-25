import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Upload } from '@aws-sdk/lib-storage';
import { v4 as uuid } from 'uuid';
import { FileUploadService } from './file-upload.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Album } from '../../albums/album';
import { AlbumsService } from '../../albums/albums.service';
import { Helper } from '../helper';
import { IPhoto } from '../../albums/iphoto';
 
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  isDragover = false;
  file: File | null = null;
  files: FileList | null = null;
  isReadyToUpload = false;
  percentCompleted = 0.0;
  showAlert = false;
  showPercentCompleted = false;
  alertColor = 'info';
  alertMessage = '';
  inProcess = false;
  isSuccess = false;
  showRetryBtn = false;
  showReUploadBtn = false;
  parallelUpload: Upload | null = null;
  photo: IPhoto | null = null;
  photos: IPhoto[] = [];
  previousUrl = '';
  @Input() album?: Album | undefined;
  url: string = 'https://family-moments.s3.us-east-2.amazonaws.com/' ?? '';

  constructor(private _fileUploadService: FileUploadService,
    private albumsService: AlbumsService,
    private router: Router) { 
    
    if (this.router.getCurrentNavigation()?.previousNavigation) { 
      this.album = this.router.getCurrentNavigation()?.extras.state?.['album'];
    }    
  }

  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ],
    nonNullable: true, 
  });

  description = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ],
    nonNullable: true
  });

  fileUploadForm = new FormGroup({
    title: this.title,
    description: this.description  
  });

  ngOnInit() {
      //console.log('album: ', this.album);
  }


  prepareForUpload($event: Event) {
    let result = false; 
    this.isDragover = false;
    this.showAlert = false;

    // if (!this.album) {
    //     this.alertColor = 'danger';
    //     this.alertMessage = 'album is required. please select an album to upload the photos to.';
    //     this.showAlert = true;
    //     return;
    //   }

    //retrieve the file content depending on the method(drag or input button) used to upload the file
    let fileContent = ($event as DragEvent).dataTransfer ? ($event as DragEvent).dataTransfer?.files : ($event.target as HTMLInputElement)?.files;
    this.files = fileContent ? fileContent : null;
    
    if (this.files !== null && this.files.length > 0) {
      
      for (let i = 0; i < this.files.length; i++) {
        this.file = this.files[i];

        result = this.validateFile(this.file);
        if (!result) {
          break;
        } else {
          let id = uuid();
          let photoToUpload: IPhoto = {
            photoId: id,
            albumId: this.album?.albumId ?? '', // Add nullish coalescing operator to provide a default value
            photoName: this.file?.name ?? '',
            title: this.file.name.replace(/\.[^/.]+$/, ""),
            //description: this.description.value,
            mimeType: this.file?.type ?? '',
            file: this.file,
            urlLink: this.url + id,
            createdAt: Helper.getLocalDateTimeString(), //format: yyyy-mm-dd hh:mm:ss
            updatedAt: Helper.getLocalDateTimeString()
          };
          console.log('photo to upload: ', photoToUpload);
          this.photos.push(photoToUpload);

          this.isReadyToUpload = true;
        }

      }
    }


  }

  async uploadFile() {
    this.fileUploadForm.disable();
    this.alertMessage = 'Please wait... your file is being uploaded.';
    this.showPercentCompleted = true;
    this.showAlert = true;    
    this.inProcess = true;   

    // if (this.file.size > 5000000) { 
    //   this.alertColor = 'danger';
    //   this.alertMessage = 'File size is too large. Please select a file less than 5MB.';
    //   this.showAlert = true;
    //   this.showRetryBtn = true;
    //   return;
    // }

    // const imgBase64 = await Helper.convertImageToBase64(this.file);
    // const imgString = Helper.encodeBase64String(imgBase64.toString().replace(/^data:image\/[a-z]+;base64,/, ""));
    // console.log(imgString);

    //const fileStream = this.file?.stream();
    const id = uuid();    

    try {   

      if (this.photos.length > 0) {
        for (let i = 0; i < this.photos.length; i++) {
          this.file = this.photos[i].file ?? null;
          
          let photoToUpload = this.photos[i];
          let response = await this._fileUploadService.uploadFile(photoToUpload);
          
          if (response.isSuccess) {
            this.alertColor = 'success';
            photoToUpload.file = undefined; //we don't want to save the file in the database - it maybe too large. file saved in s3 bucket

          }

        }

        this.isSuccess = true;

      } 
        
    } catch (error) {
        this.fileUploadForm.enable();
        this.alertColor = 'danger';
        this.alertMessage = 'An error occured while uploading your file. Please try again later.';
        this.showAlert = true;
        this.inProcess = false;
        this.showPercentCompleted = false;
        console.log(error);
    } 
    
  }

  validateFile(file: File): boolean { 

     if (file.size > 5000000) { 
      this.alertColor = 'danger';
      this.alertMessage = 'File size is too large. Please select a file less than 5MB.';
      this.showAlert = true;
      this.showRetryBtn = true;
      return false;
    }

    if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif')) {
      //show the file name in the title field
      //this.title.setValue(file.name.replace(/\.[^/.]+$/, "")); //remove file extension      
      this.isReadyToUpload = true;

      return true;

    } else {

      this.isReadyToUpload = false;
      this.alertMessage = 'Unsupported file type. Please select a file with extension .png, .jpeg, or .gif.';
      this.showPercentCompleted = false;
      this.alertColor = 'danger';
      this.showAlert = true;

      return false;
    }

  }

  onCancel(): void {
      this.isReadyToUpload = false;
      this.inProcess = false;
      this.showAlert = false;    
    return;
  }

  onReUpload(): void { 
      this.router.navigate(['albums/uploadPhotos']);
  } 

  onHandleClose() {
    this.showAlert = false;
  }

  onBackBtn(): void {
    this.router.navigate(['albums/wizard/createAlbum'], { state: { album: this.album } });
  }

  onViewAlbum(): void { 
    this.router.navigate(['albums/album-detail/' + this.album?.albumId]);
  }

  ngOnDestroy(): void { 
    if (this.parallelUpload) {
      this.parallelUpload.abort();
    }
    
  }

}


