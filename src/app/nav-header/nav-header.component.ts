import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';


import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.css'
})
export class NavHeaderComponent {
  auth: AuthService;
  loggedIn: boolean = false;

  constructor(auth: AuthService) {
    this.auth = auth;

    this.auth.getStatusObservable().subscribe(data => {
      this.loggedIn = data;
    })
  }

  handleLogOut() {
    this.auth.logOut().subscribe(data => {
      if (data == "logged out successfully") {
        this.auth.setStatus(false);
      }
    });

  }
}
