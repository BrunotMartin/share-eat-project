import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { RECETTES } from '../mock-recette';
import { Recette } from '../recette';
import { RecetteService } from '../recette.service';
import { Subscription } from 'rxjs';
import { BackendServiceService } from 'src/app/backend-service.service';
import { Utilisateur } from 'src/app/utilisateur';
import { A_like } from 'src/app/a_like';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit{

  recetteList: Recette[] = []; // = RECETTES;
  
  pageSize = 12; // Nombre d'éléments par page
  p = 1; // Page actuelle
  // ngOnInit(){
  //   console.table(this.recetteList);
  // }

  

  customLabels = {
    previousLabel: 'Précédent',
    nextLabel: 'Suivant',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: 'Vous êtes sur la page'
    // Ajoutez d'autres textes personnalisés si nécessaire
  };
  
  selectedRecette: any;
  private subscription: Subscription | undefined;
  utilisateur: Utilisateur | undefined;
  idUser: number | undefined;
  likesUser: A_like[] = []; //les recettes likés par l'utilisateur connecté
  idRecettes: number[] = []; // tableau contenant les id des recettes likés par l'utilisateur connecté


  openModal(recette: any) {
    this.selectedRecette = recette;
  }

  closeModal() {
    this.selectedRecette = null;
  }


  constructor(
    private router: Router,
    private recetteService: RecetteService,
    private backendService: BackendServiceService
    ){ }

  ngOnInit(){

    this.idUser = this.backendService.getLoggedInUserIdSeb();
    //console.log(this.backendService.getLoggedInUserIdSeb()  + "oeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")

    if (this.idUser !== undefined) {
      this.getRecettesLikesUser(this.idUser); // Appel de la fonction pour récupérer les recettes aimées
    } else {
      console.error('ID utilisateur non défini.');
    }
    
    



    this.subscription = this.recetteService.getRecetteList().subscribe({
      next: (recettes: Recette[]) => {
        this.recetteList = recettes.reverse();
      },
      error: error => {
        console.error('Error fetching recettes:', error);
      }
    });
    //this.recetteList = this.recetteService.getRecetteList();
  }
  
  getRecettesLikesUser(userId: number) {
    this.backendService.getRecettesByUserId(userId).subscribe(
      recettes => {
        this.likesUser = recettes;
        this.idRecettes = recettes
        .map(obj => obj.idRecette)
        .filter(id => id !== undefined)
        .map(id => id as number);
      console.log(this.idRecettes);
      },
      error => {
        console.error('Erreur lors de la récupération des recettes aimées:', error);
      }
    );
  }
  
  
  createLikeRecette(userId: number, recetteId: number) {
    if (userId !== undefined) {
      this.backendService.createLikeRecette(userId, recetteId).subscribe(
        response => {
          console.log('Like ajouté avec succès :', response);
          this.getRecettesLikesUser(userId);
        },
        error => {
          console.error('Erreur lors de l\'ajout du like :', error);
        }
      );
    } else {
      console.error('ID utilisateur non défini.');
    }
  }

  deleteLikeRecette(userId: number, recetteId: number) {
    if (userId !== undefined) {
      this.backendService.deleteLike(userId, recetteId).subscribe(
        response => {
          console.log('Like supprimé avec succès :', response);
          this.getRecettesLikesUser(userId);
        },
        error => {
          console.error('Erreur lors de la suppression du like :', error);
        }
      );
    } else {
      console.error('ID utilisateur non défini.');
    }
  }

  createLikeOrDeleteLike(event: MouseEvent, userId: number, recetteId: number) {
    event.stopPropagation();
    if (userId !== undefined) {
      if (this.idRecettes.includes(recetteId)) {
        this.deleteLikeRecette(userId, recetteId);
      } else {
        this.createLikeRecette(userId, recetteId);
      }
    } else {
      console.error('ID utilisateur non défini.');
    }
  }
  


  goToRecette(recette: Recette){
    this.router.navigate(['/recette', recette.idRecette]);
  }
}


