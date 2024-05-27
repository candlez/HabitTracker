import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { WindowService } from '../window.service';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NgIf],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  auth: AuthService;
  router: Router;

  loaded: boolean = true;
  authError: boolean = false;
  redirect: boolean;

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
      windowService.getNativeWindow().addEventListener("load", () => {
        this.loaded = false;
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

  handleSubmit(username: string, password: string) {
    this.auth.login(username, password).subscribe(
      data => {
        if (data == "logged in successfully!") {
          this.auth.setStatus(true);
          const path = this.auth.getReturnPath();
          this.auth.setReturnPath("/dashboard");
          this.router.navigateByUrl(path);
        } else if (data == "username not found" || data == "password incorrect") {
          this.authError = true;
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
