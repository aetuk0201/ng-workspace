import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback/signout-redirect-callback.component';

export const routes: Routes = [
    { 
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
  },
  { path: 'home', component: HomeComponent },
  { path: 'signin-callback', component: SigninRedirectCallbackComponent },
  { path: 'signout-callback', component: SignoutRedirectCallbackComponent }
];
