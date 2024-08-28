import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgIf, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';


import { AuthService } from '../../services/auth.service';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.scss'
})
export class NavHeaderComponent {
  loggedIn: boolean = false;
  loaded: boolean = false;


  constructor(
    public auth: AuthService, 
    windowService: WindowService, 
    @Inject(PLATFORM_ID) private platformId: Object) {

    this.auth.getStatusObservable().subscribe(data => {
      this.loggedIn = data;
    });

    if (isPlatformBrowser(platformId)) {
      windowService.getNativeWindow().addEventListener("load", () => {
        this.auth.authenticate().subscribe(() => {
          this.loaded = true;
        });
      });
    }
  }

  handleLogOut() {
    this.auth.logOut().subscribe(data => {
      if (data == "logged out successfully") {
        this.auth.setStatus(false);
      }
    });
  }

  resetReturnPath() {
    this.auth.setReturnPath("/dashboard");
  }
}
