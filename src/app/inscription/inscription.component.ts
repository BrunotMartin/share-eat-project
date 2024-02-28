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

    if (!this.credentials.nom.trim() || !this.credentials.prenom.trim() || !this.credentials.pseudo.trim() || !this.credentials.mail.trim() || !this.credentials.mail.includes('@')) {
      alert("Veuillez remplir tous les champs obligatoires et assurez-vous que l'adresse e-mail est valide.");
      return;
    }

    if (!this.isPasswordValid()) {
      alert("Le mot de passe ne respecte pas les critères de sécurité : Au moins un chiffre. Au moins une lettre minuscule. Au moins une lettre majuscule. Au moins un caractère spécial parmi @#$%^&+=!. Pas d'espaces blancs. Au moins 8 caractères");
      return;
      
    }

    alert("Votre compte a été crée avec succès. Veuillez vous connecter désormais.");
    // Redirection en fonction du résultat
    this.router.navigateByUrl('/login');

    this.backendService.registerUser(this.credentials).subscribe(
      response => {
        // Gérer la réponse réussie, par exemple, stocker le jeton d'authentification
        console.log('Inscription réussie:', response);
      },
      error => {
        // Gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur
        console.error('Erreur d\'inscription:', error);
      }
    );
  }

  private isPasswordValid(): boolean {
    // Valider le mot de passe selon le pattern
    const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/;
    return passwordPattern.test(this.credentials.mdp);
  }

}
