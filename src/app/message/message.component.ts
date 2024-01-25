import { Component } from '@angular/core';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  pseudo: string = '';
  userData: any;
  messageToSend: string = '';
  messages: any[] = [];

  constructor(private backendService: BackendServiceService) {}

  

  searchUser(): void {
    this.backendService.searchUserByPseudo(this.pseudo).subscribe(
      (data) => {
        this.userData = data;
        this.loadMessages();
      },
      (error) => {
        console.error(error);
        // Handle errors here
      }
    );
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