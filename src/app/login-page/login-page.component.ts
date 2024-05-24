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

  loaded: boolean = false;

  constructor(auth: AuthService, router: Router, windowService: WindowService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.auth = auth;
    this.router = router;

    if (isPlatformBrowser(platformId)) {
      windowService.getNativeWindow().addEventListener("load", () => {
        this.auth.authenticate().subscribe((result) => {
          if (result == "true") {
            const path = this.auth.getReturnPath();
            if (path != "") {
              this.auth.setReturnPath("");
              this.router.navigateByUrl(path);
            }
          }
          this.loaded = true;
        })
      })
    }
  }

  handleSubmit(username: string, password: string) {
    this.auth.login(username, password).subscribe(
      data => {
        if (data == "logged in successfully!") {
          this.auth.setStatus(true);
          const path = this.auth.getReturnPath();
          if (path != "") {
            this.auth.setReturnPath("");
            this.router.navigateByUrl(path);
          }
        } else if (data == "username not found") {
          
        } else if (data == "password incorrect") {
          
        } else {
          console.log(data);
        }
      }
    );
  }
}
