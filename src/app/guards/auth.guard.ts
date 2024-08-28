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
      authService.setReturnPath(state.url);
      router.navigateByUrl("/login");
      return false;
    }
  }));
};
