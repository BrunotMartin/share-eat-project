import { Component } from '@angular/core';
import { BackendServiceService } from '../backend-service.service';

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

  constructor(private backendService: BackendServiceService) {}

  

  search(): void {
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
                this.loadMessages();
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







}

