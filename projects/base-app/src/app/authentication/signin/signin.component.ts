import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService, UserCredentials } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  username = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
      Validators.pattern(/^[a-z0-9]+$/i)
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20)
  ]);

  authForm = new FormGroup({
    username: this.username,
    password: this.password   
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  onSubmit() { 
    if (this.authForm.invalid) {
      return;
    }

    let credentials: UserCredentials = {
      username: this.authForm.value.username || '',
      password: this.authForm.value.password || ''
    }
    this.authService.signin(credentials).subscribe({
      next: (response) => {
        // Navigate to some other route
        // this.router.navigateByUrl('/'); -- go to home page
      },
      error: ({ error }) => {
        if (error.username || error.password) {
          this.authForm.setErrors({ invalidCredentials: true });
        } else if (error.authenticated === false) {
          this.authForm.setErrors({ invalidCredentials: true });
        }  else {
          this.authForm.setErrors({ unknownError: true });
        }
      }
    });
  }

}
