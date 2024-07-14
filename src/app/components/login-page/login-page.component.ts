import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../services/auth.service';
import { WindowService } from '../../services/window.service';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NgIf, MatProgressSpinnerModule, NgClass],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  auth: AuthService;
  router: Router;

  loaded: boolean = false;
  authError: string = "";
  redirect: boolean;
  authenticating: boolean = false;

  constructor(auth: AuthService, router: Router, windowService: WindowService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.auth = auth;
    this.router = router;

    this.redirect = (this.auth.getReturnPath() != "/dashboard");

    this.auth.getReturnPathObservable().subscribe(
      data => {
        this.redirect = (this.auth.getReturnPath() != "/dashboard");
      }
    )

    if (isPlatformBrowser(platformId)) {
      if (windowService.isWindowLoaded()) {
        this.loaded = true;
      } else {
        windowService.getNativeWindow().addEventListener("load", () => {
          this.auth.authenticate().subscribe((result) => {
            if (result == "true") {
              const path = this.auth.getReturnPath();
              this.auth.setReturnPath("/dashboard");
              this.router.navigateByUrl(path);
            }
            this.loaded = true;
          });
        });
      }
    }
  }

  handleSubmit(username: string, password: string) {
    this.authenticating = true;
    this.auth.login(username, password).subscribe(
      data => {
        this.authenticating = false;
        if (data == "logged in successfully!") {
          this.auth.setStatus(true);
          const path = this.auth.getReturnPath();
          this.auth.setReturnPath("/dashboard");
          this.router.navigateByUrl(path);
        } else if (data == "username not found" || data == "password incorrect") {
          this.authError = "Username or Password is incorrect";
        } else if (data == "you must specify a username") {
          this.authError = "You must provide a Username";
        } else if (data == "you must specify a password") {
          this.authError = "You must provide a Password"
        } else {
          console.log(data);
        }
      }
    );
  }

  handleKeyPress(event: KeyboardEvent, username: string, password: string) {
    if (event.key == "Enter") {
      this.handleSubmit(username, password);
    }
  }
}
