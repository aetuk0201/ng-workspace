import { NgModule } from '@angular/core';
import { AlbumComponent } from './album/album.component';
import { AlbumsListComponent } from './albums-list/albums-list.component';
import { AlbumsRoutingModule } from './albums-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { AlbumWizardComponent } from './album-wizard/album-wizard.component';
import { AlbumSelectComponent } from './album-select/album-select.component';
import { UploadPhotosComponent } from './upload-photos/upload-photos.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { PhotoComponent } from './photo/photo.component';
import { PhotoPreviewComponent } from './photo-preview/photo-preview.component';

@NgModule({
  declarations: [
    AlbumComponent,
    AlbumsListComponent,
    CreateAlbumComponent,
    EditAlbumComponent,
    AlbumWizardComponent,
    AlbumSelectComponent,
    UploadPhotosComponent,
    PhotoListComponent,
    AlbumDetailComponent,
    PhotoComponent,
    PhotoPreviewComponent
  ],
  imports: [
    AlbumsRoutingModule,
    SharedModule
  ]
})
export class AlbumsModule { }
