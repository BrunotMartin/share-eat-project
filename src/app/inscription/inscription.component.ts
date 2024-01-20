import { Component } from '@angular/core';
import { BackendServiceService } from '../backend-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {
  credentials = { nom: '', prenom: '', pseudo: '', mail: '', mdp: '' };

  constructor(private backendService: BackendServiceService, private router: Router) { }

  register() {
    this.backendService.registerUser(this.credentials).subscribe(
      response => {
        // Gérer la réponse réussie, par exemple, stocker le jeton d'authentification
        console.log('Inscription réussie:', response);
        this.router.navigate(['/login']);
      },
      error => {
        // Gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur
        console.error('Erreur d\'inscription:', error);
      }
    );
  }

}
