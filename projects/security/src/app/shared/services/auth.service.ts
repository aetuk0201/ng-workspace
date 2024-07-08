import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';  
import { Constants } from './constants';
import { Subject } from 'rxjs';
import { AppUser } from '../../app-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userManager: UserManager;
  private _user: User | null | undefined;
  appUser: AppUser | null = null;
  private _loginChangedSubject = new Subject<boolean>();

  loginChanged = this._loginChangedSubject.asObservable();

   constructor() { 
    this._userManager = new UserManager(this.idpSettings);
  }

  private get idpSettings() : UserManagerSettings {
    return {
      authority: Constants.stsAuthority,
      client_id: Constants.clientId,
      redirect_uri: `${Constants.clientRoot}/signin-callback`,
      scope: "openid profile companyApi",
      response_type: "code",
      post_logout_redirect_uri: `${Constants.clientRoot}/signout-callback`,
      automaticSilentRenew: true,
      silent_redirect_uri: `${Constants.clientRoot}assets/silent-callback.html`
    }
  }

  public login() {
    return this._userManager.signinRedirect();
  }

  public isAuthenticated = (): Promise<boolean> => {
     return this._userManager.getUser()
       .then(user => {        
         //const userCurrent = !!user && !user.expired;
         
           if(this._user !== user){
              this._loginChangedSubject.next(this.checkUser(user));
            }
           this._user = user;      
        
      return this.checkUser(user);
    })
  }

  private checkUser = (user : User | null): boolean => {
    return !!user && !user.expired;
  }

  completeLogin() {

    return this._userManager.signinRedirectCallback().then(user => {
      this._user = user;
      this._loginChangedSubject.next(!!user && !user.expired);
      return user;
    });

  }

  logout() {
    this._userManager.signoutRedirect();
  }

  completeLogout() {
    this._user = null;
    this.appUser = null;

    localStorage.removeItem('userId');
    localStorage.removeItem('userName');

    this._loginChangedSubject.next(false);
    return this._userManager.signoutRedirectCallback();
  }

  getAccessToken() {
    return this._userManager.getUser().then(user => {
      if (!!user && !user.expired) {
        return user.access_token;
      }
      else {
        return null;
      }
    });
  }
 
}
