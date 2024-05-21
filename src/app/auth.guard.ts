import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { map } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.authenticate().pipe(map(response => {
    console.log(response);
    if (response == "true") {
      return true;
    } else {
      router.navigateByUrl("/login");
      return false;
    }
  }));
};
