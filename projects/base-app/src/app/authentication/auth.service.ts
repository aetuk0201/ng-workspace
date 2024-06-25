import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

export interface UsernameAvailableResponse {
  available: boolean;
}

export interface UserCredentials {  
  username: string;
  password: string;
  passwordConfirmation?: string;
}

export interface AuthResponse {
  authenticated?: boolean;
  username: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signedin$: any = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>('https://api.angular-email.com/auth/username', {
      username
    });
  }

  signup(credentials: UserCredentials) {
    return this.http.post<AuthResponse>('https://api.angular-email.com/auth/signup', credentials)
      .pipe(tap(() => {
        this.signedin$.next(true);
      }));
  }

  signin(credentials: UserCredentials) {
    return this.http.post<AuthResponse>('https://api.angular-email.com/auth/signin', credentials)
      .pipe(tap(() => {
        this.signedin$.next(true);
      }));
  }

  checkAuth() {
    return this.http.get<AuthResponse>('https://api.angular-email.com/auth/signedin')
      .pipe(tap(({ authenticated }) => {
        this.signedin$.next(authenticated);
      }));
  }

}
