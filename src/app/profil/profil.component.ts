import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { BackendServiceService } from '../backend-service.service';
import { Router } from '@angular/router';
//import { MenuComponent } from '../page-accueil/menu/menu.component';


import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profil-root',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})

export class ProfilComponent implements OnInit {
  prenom = '';
  identifiant = '';
  biographie = '';
  profileImage: any;
  bio: any;

  
  constructor(private backendService: BackendServiceService, private userService: UserService, private router: Router, private location : Location ) { }

  loadProfileImage(): void {
    this.backendService.getProfileImage().subscribe(
      (imageData) => {
        // Créer un objet Blob à partir des données binaires
        const blob = new Blob([imageData], { type: 'image/*' });
  
        // Convertir le Blob en URL d'image
        const imageUrl = URL.createObjectURL(blob);
  
        // Stocker l'URL de l'image de profil dans la variable profileImage
        this.profileImage = imageUrl;
      },
      (error) => {
        console.error('Erreur lors du chargement de l\'image de profil', error);
      }
    );
  }

  

  ngOnInit(): void {
    // Initialise les données de l'utilisateur depuis le service
    const userPrenom = this.userService.getPrenom();
    const userIdentifiant = this.userService.getIdentifiant();
    const userBiographie = this.userService.getBiographie();

    // Vérifie si les valeurs du service ne sont pas null ou undefined avant l'assignation
    this.prenom = userPrenom ? userPrenom : '';
    this.identifiant = userIdentifiant ? userIdentifiant : '';
    this.biographie = userBiographie ? userBiographie : '';

    const userId = this.backendService.getLoggedInUserId();
    // this.bioList$ = this.backendService.getUserBio();

  if (userId) {
    // Appeler la méthode pour charger la bio lors de l'initialisation
    // this.loadProfileBio(userId);
  }
  }

  // Méthode pour récupérer le prénom de l'utilisateur connecté
  getPrenomUtilisateurConnecte(): string | null {
    return this.backendService.getPrenomUtilisateurConnecte();
  }

  // Méthode pour récupérer le pseudo de l'utilisateur connecté
  getPseudoUtilisateurConnecte(): string | null {
    return this.backendService.getPseudoUtilisateurConnecte();
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
        this.backendService.setLoggedIn(false);
        this.router.navigate(['/login']);

      },
      (error) => {
        // Gérer les erreurs de déconnexion
        console.error('Erreur lors de la déconnexion', error);

        if (error instanceof HttpErrorResponse) {
          console.error('Statut de l\'erreur:', error.status);
          console.error('Message de l\'erreur:', error.error);
        }
      }
    );

    
    // Autres actions de déconnexion, par exemple, rediriger vers la page de connexion
    console.log('Déconnexion');
  }
}