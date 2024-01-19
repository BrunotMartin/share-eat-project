import { Component } from '@angular/core';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // email = '';
  // mdp = ''; 
  credentials = { mail: '', mdp: '' };

  constructor(private backendService: BackendServiceService) { }

  // onSubmit(email: string, mdp: string): void {
  //   this.backendService.login(email, mdp).subscribe(
  //     (response) => {
  //       console.log('Authentification réussie', response);
  //     },
  //     (error) => {
  //       console.log('Erreur lors de l\'authentification wsh', error);
  //     }
  //   );
  // }

  login() {
    this.backendService.login(this.credentials).subscribe(
      response => {
        // Gérer la réponse réussie, par exemple, stocker le jeton d'authentification
        console.log('Connexion réussie:', response);
      },
      error => {
        // Gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur
        console.error('Erreur de connexion:', error);
      }
    );
  }
  utilisateurs: any[] = [];

}
