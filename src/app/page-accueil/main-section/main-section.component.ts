import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { RECETTES } from '../mock-recette';
import { Recette } from '../recette';
import { RecetteService } from '../recette.service';
import { Subscription } from 'rxjs';
import { BackendServiceService } from 'src/app/backend-service.service';
import { Utilisateur } from 'src/app/utilisateur';
import { A_like } from 'src/app/a_like';
import { BackendServiceService } from 'src/app/backend-service.service';



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
  commentairesList: any[] = []; 
  userDetailsMap: Map<number, any> = new Map<number, any>();
  newCommentContent = '';

  private subscription: Subscription | undefined;
  utilisateur: Utilisateur | undefined;
  idUser: number | undefined;
  likesUser: A_like[] = []; //les recettes likés par l'utilisateur connecté
  idRecettes: number[] = []; // tableau contenant les id des recettes likés par l'utilisateur connecté


  openModal(recette: any) {
    this.selectedRecette = recette;
    this.getCommentaires(recette.idRecette);
    this.newCommentContent = '';
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
    
    




    this.recetteService.getCommentaires(6)
      .subscribe(commentaires => {
        this.commentairesList = commentaires;
        console.log('Commentaires récupérés pour la recette 6 :', this.commentairesList);
      });
    
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

  getCommentaires(recetteId: number): void {
    this.recetteService.getCommentaires(recetteId).subscribe(commentaires => {
      this.commentairesList = commentaires;
      console.log('Commentaires récupérés :', this.commentairesList);

      // Pour chaque commentaire, récupérez les détails de l'utilisateur
      this.commentairesList.forEach(commentaire => {
        this.recetteService.getUtilisateurPhotoById(commentaire.idUtilisateur).subscribe(photoUrl => {
          commentaire.photoUrl = photoUrl;
          console.log('tgtgtgt :',commentaire.photoUrl) // Stocke l'URL de l'image de l'utilisateur dans chaque commentaire
        });
        // Utilisez l'ID de l'utilisateur pour récupérer ses détails
        this.recetteService.getUtilisateurById(commentaire.idUtilisateur).subscribe(utilisateur => {
          this.userDetailsMap.set(commentaire.idUtilisateur, utilisateur);  
          console.log('Informations sur l\'utilisateur :', utilisateur);
            // Utilisez les informations sur l'utilisateur ici
            console.log('Clés dans userDetailsMap :', this.userDetailsMap.keys());
            console.log('ID Utilisateur du commentaire :', commentaire.idUtilisateur);
            console.log('Pseudo de l\'utilisateur :', this.userDetailsMap.get(commentaire.idUtilisateur)?.photo);
        });
      });
    });
  }


  addComment(newCommentContent: string, recetteId: number): void {
    // Obtenez l'ID de l'utilisateur connecté à partir du service BackendServiceService
    const userId = this.backendService.getLoggedInUserId();
    if (userId) {
      const newComment = {
        idUtilisateur: userId,
        idRecette: recetteId,
        contenu: newCommentContent,
        date: new Date()
      };
    
      this.recetteService.addCommentaire(newComment).subscribe({
        next: (commentaire: any) => {
          console.log('Commentaire ajouté avec succès :', commentaire);
          this.getCommentaires(recetteId);
        },
        error: error => {
          console.error('Erreur lors de l\'ajout du commentaire :', error);
        }
      });
    } else {
      console.error('L\'utilisateur n\'est pas connecté.'); // Gérez le cas où l'utilisateur n'est pas connecté
    }
  }


  

  onCommentInputChange(event: any): void {
    this.newCommentContent = event.target.value;
  }
  
  
  
}


