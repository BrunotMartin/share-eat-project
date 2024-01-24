import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BackendServiceService } from './backend-service.service'; // Assurez-vous d'importer votre service d'authentification

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private backendService: BackendServiceService, private router: Router) {}

  canActivate(): boolean {
    if (!this.backendService.isLoggedIn) {
      // Utilisateur déconnecté, rediriger vers la page de connexion
      this.router.navigate(['/login'], { replaceUrl: true });
      return false;
    }
    return true;
  }
}
