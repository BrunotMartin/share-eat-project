import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { BackendServiceService } from '../backend-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-root',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})

export class ProfilComponent implements OnInit {
  prenom = '';
  identifiant = '';
  biographie = '';
  constructor(private backendService: BackendServiceService, private userService: UserService, private router: Router ) { }

  ngOnInit(): void {
    // Initialise les données de l'utilisateur depuis le service
    const userPrenom = this.userService.getPrenom();
    const userIdentifiant = this.userService.getIdentifiant();
    const userBiographie = this.userService.getBiographie();

    // Vérifie si les valeurs du service ne sont pas null ou undefined avant l'assignation
    this.prenom = userPrenom ? userPrenom : '';
    this.identifiant = userIdentifiant ? userIdentifiant : '';
    this.biographie = userBiographie ? userBiographie : '';
  }

  modifierProfil() {
    // Logique pour la modification du profil (à compléter)
    // Par exemple, ouvrir une boîte de dialogue/modal pour la modification
    console.log("Modifier le profil");
  }

  deconnexion() {
    // Appeler la méthode de déconnexion du service backend
    this.backendService.deconnexion().subscribe(
      (response) => {
        // Gérer la réponse de déconnexion (peut être vide)
        console.log('Déconnexion réussie', response);
        this.router.navigate(['/login'], { replaceUrl: true });
      },
      (error) => {
        // Gérer les erreurs de déconnexion
        console.error('Erreur lors de la déconnexion', error);
      }
    );
    // Autres actions de déconnexion, par exemple, rediriger vers la page de connexion
    console.log('Déconnexion');
  }
}