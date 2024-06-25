import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService, UserCredentials } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isLoggingIn: boolean = false;

  username = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(10),
    Validators.pattern(/^[a-z0-9]+$/i)
  ]); //[this.uniqueUsername.validate]

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20)
  ]);

  passwordConfirmation = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20)
  ]);

  email = new FormControl('', [ 
    Validators.required,
    Validators.email
  ])

  authForm = new FormGroup({
    username: this.username,
    email: this.email,
    password: this.password,
    passwordConfirmation: this.passwordConfirmation
  }, {} ); //{ validators: [this.matchPassword.validate] }

  constructor(private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService) { }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    const signupCredentials: UserCredentials = {
      username: this.authForm.value.username ?? '',
      password: this.authForm.get('password')?.value!
    };

    if (this.isLoggingIn) {
      // login logic
    } else {

      this.authService.signup(signupCredentials).subscribe({
        next: (response) => {
          // Navigate to some other route
        },
        error: (err) => {
          if (!err.status) {
            this.authForm.setErrors({ noConnection: true });
          } else {
            this.authForm.setErrors({ unknownError: true });
          }
        }
      });

    }

  }

}

