import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { DeconnexionService } from '../deconnecter/deconnecter.service';

@Component({
  selector: 'app-profil-root',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})

export class ProfilComponent implements OnInit {
  prenom: string = '';
  identifiant: string = '';
  biographie: string = '';
  
  constructor(
    private userService: UserService,
    private deconnexionService: DeconnexionService
  ) { }
  

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
    // Utilise le service de déconnexion
    this.deconnexionService.deconnexion();
    console.log("Déconnexion");
  }
}