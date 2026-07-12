import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('[AUTH GUARD] Checking token...');


  const token = authService.getToken();
  console.log('[GUARD] Token détecté :', token); 

  if (token) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

