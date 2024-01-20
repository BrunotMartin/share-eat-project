// socket.service.ts

import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // URL du serveur Socket.IO, ajustez selon votre configuration
    const serverUrl = 'http://localhost:3000';

    // Configuration du socket, ajustez selon vos besoins
    const options = {
      withCredentials: true,
      transports: ['websocket'],
    };

    // Création de l'instance du socket
    this.socket = io(serverUrl, options);
  }

  // Méthode pour obtenir l'instance du socket
  getSocket(): Socket {
    return this.socket;
  }
}
