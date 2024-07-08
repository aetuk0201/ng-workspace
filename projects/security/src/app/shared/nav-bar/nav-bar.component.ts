import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  @Input() isLoggedIn = false;
  @Output() btnClick = new EventEmitter<boolean>();
  userName: string | undefined;
  userId: string | undefined;

  constructor(private _authService: AuthService) { 

      this._authService.loginChanged.subscribe(loggedIn => {
        this.isLoggedIn = loggedIn;

        this.userId = localStorage.getItem("userId")?.toString();
        this.userName = localStorage.getItem("userName")?.toString();
      });
  }
  
  login() {
    //this._authService.login();
    this.btnClick.emit(true);
  }

  logout() {
    //this._authService.logout();
    this.btnClick.emit(false);
  }

}
