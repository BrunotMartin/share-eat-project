// deconnexion.service.ts

import { Injectable } from '@angular/core';
import { SocketService } from '../socket/socket.service';

@Injectable({
  providedIn: 'root',
})
export class DeconnexionService {
  constructor(private socketService: SocketService) {}

  deconnexion(): void {
    // Utilisez le service SocketService pour obtenir l'instance du socket
    const socket = this.socketService.getSocket();

    // Logique de déconnexion
    // Par exemple, rediriger vers la page de connexion ou effacer les données utilisateur
    console.log("Déconnexion"); 
    socket.disconnect();
  }
}
