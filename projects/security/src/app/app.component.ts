import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'security';
  isLoggedIn = false;
  isLoginClicked = false;

  constructor(private _authService: AuthService) {
    
    this._authService.loginChanged.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnInit() {
    
      this._authService.isAuthenticated().then(loggedIn => {
        this.isLoggedIn = loggedIn;
      });
    
  }

  handleAuthentication(loginClick: boolean) {
    
    if (loginClick) {
      this._authService.login();
    }
    
    if (!loginClick) {
      this._authService.logout();
    }

  }

  login() {
    this._authService.login();
  }

  logout() {
    this._authService.logout();
  }

}
