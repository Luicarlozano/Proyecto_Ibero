import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const isLoggedGuard = () => {
  const router = inject(Router);
  if (typeof window !== 'undefined' && window.localStorage) {
    if (!sessionStorage.getItem('token')) {
      router.navigate(['']);
      return true;
    } else {
      return false;
    }
  }
  router.navigate(['']);
  return false;
};
