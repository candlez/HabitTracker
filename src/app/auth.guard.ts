import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { map } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.authenticate().pipe(map(response => {
    if (response == "true") {
      authService.setStatus(true);
      return true;
    } else {
      authService.setStatus(false);
      authService.setReturnPath(route.url[0].path);
      router.navigateByUrl("/login");
      return false;
    }
  }));
};
