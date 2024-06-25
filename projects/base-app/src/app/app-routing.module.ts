import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { FileUploadComponent } from './shared/file-upload/file-upload.component';

const routes: Routes = [
  {
    path: 'collections',
    loadChildren: () =>
      import('./collections/collections.module').then(m => m.CollectionsModule)
  },
  {
    path: 'elements',
    loadChildren: () =>
      import('./elements/elements.module').then(m => m.ElementsModule)
  },
  {
    path: 'mods',
    loadChildren: () =>
      import('./mods/mods.module').then(m => m.ModsModule)
  },
  {
    path: 'albums',
    loadChildren: () =>
      import('./albums/albums.module').then(m => m.AlbumsModule)
  },
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'fileupload', component: FileUploadComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

