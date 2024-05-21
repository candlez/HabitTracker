import { Component } from '@angular/core';


import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  auth: AuthService;


  constructor(auth: AuthService) {
    this.auth = auth;
  }

  handleSubmit(username: string, password: string) {
    this.auth.login(username, password).subscribe(
      data => {
        // here is where we will handle different cases
        console.log(data);
      }
    );
  }
}
