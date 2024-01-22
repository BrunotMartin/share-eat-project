import { Component } from '@angular/core';
import { BackendServiceService } from '../backend-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials = { mail: '', mdp: '' };

  constructor(private backendService: BackendServiceService, private router: Router) { }

  login() {
    this.backendService.login(this.credentials).subscribe(
      response => {
        // Gérer la réponse réussie, par exemple, stocker le jeton d'authentification
        console.log('Connexion réussie:', response);
        this.router.navigate(['/accueil']);
      },
      error => {
        // Gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur
        console.error('Erreur de connexion:', error);
      }
    );
  }
  utilisateurs: any[] = [];

}
