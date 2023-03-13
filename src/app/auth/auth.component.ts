import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      {
        next: (res) => {
          console.log(res);
          (this.isLoading = false);
        },
        error: (errorMessage: string) => {
          console.error(errorMessage),
           (this.error = errorMessage);
          this.isLoading = false;
        },
        complete: () => console.info('complete'),
      }
      // (res) => {
      //   console.log(res);
      //   this.isLoading = false;
      // },
      // (errorMessage:string) => {
      //  console.log(errorMessage);
      //  this.error = errorMessage;
      //  this.isLoading = false;
      // }
    );

    form.reset();
  }
}