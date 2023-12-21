import { CanActivateFn } from '@angular/router';
import { AuthentificationService } from './authentification.service';
import { Router } from 'express';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthentificationService);
  const router = inject(Router);
  
  console.log("Le garde est bien appelé");
  if(!auth.isUserLoggedIn()){
    return true;
  }
  router.navigateByUrl('/login');
  return false;
  // return true;
};
