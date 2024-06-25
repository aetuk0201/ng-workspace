import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { AlbumsHomeComponent } from './albums-home/albums-home.component';
import { AlbumsListComponent } from './albums-list/albums-list.component';
import { FileUploadComponent } from '../shared/file-upload/file-upload.component';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { AlbumWizardComponent } from './album-wizard/album-wizard.component';
import { UploadPhotosComponent } from './upload-photos/upload-photos.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';

const routes: Routes = [{
  path: '', component: AlbumsHomeComponent,
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: AlbumsListComponent },
    { path: 'album-detail/:albumId', component: AlbumDetailComponent },
    {
      path: 'wizard', component: AlbumWizardComponent,
      children: [
      { path: '', redirectTo: 'createAlbum', pathMatch: 'full' },
      { path: 'createAlbum', component: CreateAlbumComponent },
      { path: 'photoUpload', component: FileUploadComponent }
      ]
    },
    { path: 'albums/:albumId/edit', component: EditAlbumComponent },
    { path: 'uploadphotos', component: UploadPhotosComponent } 
  ]
}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AlbumsRoutingModule { }
