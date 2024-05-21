import { Component } from '@angular/core';


import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  auth: AuthService;
  router: Router;


  constructor(auth: AuthService, router: Router) {
    this.auth = auth;
    this.router = router;
  }

  handleSubmit(username: string, password: string) {
    this.auth.login(username, password).subscribe(
      data => {
        if (data == "logged in successfully!") {
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
