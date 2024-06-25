import { BehaviorSubject } from 'rxjs';
import { AuthService } from './authentication/auth.service';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'base-app';
  signedin$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    this.signedin$ = this.authService.signedin$;
  }
  
  ngOnInit() {
    this.authService.checkAuth().subscribe(() => {});
  }

  ngOnDestory() {
    this.authService.signedin$.unsubscribe();
  }

}
