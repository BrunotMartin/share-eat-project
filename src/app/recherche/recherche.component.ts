import { Component } from '@angular/core';
import { BackendServiceService } from '../backend-service.service';
import { Recette } from '../page-accueil/recette';
import { Subscription } from 'rxjs';
import { Utilisateur } from '../utilisateur';
import { A_like } from '../a_like';
import { RecetteService } from '../page-accueil/recette.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent {
  searchTerm = '';
  pseudo: string = '';
  userData: any;
  recipeData: any;
  messageToSend: string = '';
  messages: any[] = [];





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



  constructor(private backendService: BackendServiceService,
    private router: Router,
    private recetteService: RecetteService
    ) {}

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

  search(): void {

    this.userData = null;
    this.recipeData = null;
    // Vérifier si la recherche concerne un utilisateur ou une recette
    if (this.searchTerm) {
      console.log('Search term:', this.searchTerm);
      // Rechercher une recette par nom
      this.backendService.searchRecipeByName(this.searchTerm).subscribe(
        (recipeData) => {
          console.log('Recipe data:', recipeData); 
          if (recipeData && recipeData.length > 0) {
            this.recipeData = recipeData;
            // Traitez les données de recette retournées par le backend comme vous le souhaitez
          } else {
            
            // Si aucune recette n'est trouvée, recherchez l'utilisateur uniquement si la recherche ne correspond pas à une recette
            this.backendService.searchUserByPseudo(this.searchTerm).subscribe(
              (userData) => {
                console.log('User data:', userData); 
                this.userData = userData;
                
              },
              (error) => {
                console.error("Error searching for user:", error);
                // Gérer les erreurs ici
              }
            );
          }
        },
        (error) => {
          console.error("Error searching for recipe:", error);
          // Gérer les erreurs ici
        }
      );
    } else {
      console.warn("No search term provided.");
    }
}



  sendMessage(): void {
    // Vérifier si un utilisateur est sélectionné
    if (this.userData) {
        // Récupérer l'ID de l'utilisateur destinataire
        const recipientUserId = this.userData.idUtilisateur;

        // Récupérer le message à envoyer
        const messageContent = this.messageToSend;

        // Appeler votre service Angular pour envoyer le message côté serveur
        this.backendService.sendMessage(recipientUserId, messageContent).subscribe(
            (response) => {
                // Gérer la réponse du serveur si nécessaire
                console.log("Message envoyé avec succès", response);

                // Recharger la liste des messages entre utilisateurs
                this.loadMessages();

                // Effacer le champ de saisie après l'envoi du message
                this.messageToSend = '';
            },
            (error) => {
                // Gérer les erreurs d'envoi du message
                console.error("Erreur lors de l'envoi du message", error);
            }
        );
    } else {
        console.warn("Aucun utilisateur sélectionné pour l'envoi du message.");
    }
}

loadMessages(): void {

  // Récupérer l'ID de l'utilisateur émetteur
  const senderUserId = this.backendService.getLoggedInUserId();
  console.log('ID utilisateur connecté massage.ts :', senderUserId);
  

  // Récupérer l'ID de l'utilisateur destinataire
  const recipientUserId = this.userData ? this.userData.idUtilisateur : null;
  if (senderUserId !== null && recipientUserId !== null) {
    // Appeler votre service Angular pour charger les messages entre utilisateurs
    this.backendService.getMessagesBetweenUsers(senderUserId, recipientUserId).subscribe(
      (messages: any[]) => {
        console.log('Messages reçus du serveur:', messages);
        // Gérer les messages chargés du serveur
        this.messages = messages.filter((message) => {
          return message.idSender === senderUserId || message.idReceiver === senderUserId;
      });
      console.log('Messages affichés:', this.messages);
    },
      (error) => {
        // Gérer les erreurs de chargement des messages
        console.error("Erreur lors du chargement des messages", error);
      }
    );
  } else {
    console.warn("L'ID de l'utilisateur émetteur n'est pas disponible.");
  }
}

openModal(recette: any) {
  this.selectedRecette = recette;
  this.getCommentaires(recette.idRecette);
  this.newCommentContent = '';
}

closeModal() {
  this.selectedRecette = null;
}






}

