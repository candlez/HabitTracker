import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.authenticate().pipe(map(response => {
    if (response == "true") {
      return true;
    } else {
      var path = "";
      for (var i = 0; i < route.url.length; i++) {
        path += "/" + route.url[i].path;
      }
      authService.setReturnPath(path);
      router.navigateByUrl("/login");
      return false;
    }
  }));
};
