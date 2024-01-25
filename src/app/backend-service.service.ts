import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  readonly API_URL = 'http://localhost:8080';
  readonly ENDPOINT_UTILISATEURS = '/utilisateurs';
  readonly ENDPOINT_LOGIN = '/login';
  readonly ENDPOINT_INSCRIPTION = '/inscription';
  readonly ENDPOINT_DECONNEXION = '/deconnexion';
  readonly ENDPOINT_RECHERCHE_UTILISATEUR = '/pseudo';

  private isAuthenticated = false;
  private loggedInUserId: number | null = null;

  

  constructor(private httpClient : HttpClient) {  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Méthode pour définir l'état d'authentification
  setLoggedIn(value: boolean): void {
    this.isAuthenticated = value;
  }
  


  // Méthode pour définir l'ID de l'utilisateur connecté
  setLoggedInUserId(userId: number | null): void {
    this.loggedInUserId = userId;
  }

  // Méthode pour obtenir l'ID de l'utilisateur connecté
  getLoggedInUserId(): number | null {
    return this.loggedInUserId;
  }

  

   login(credentials: { mail: string, mdp: string }): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
     return this.httpClient.post<any>(this.API_URL+this.ENDPOINT_LOGIN, credentials, { headers });
   }

   registerUser(credentials: { nom: string, prenom: string, mail: string, mdp: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.post<any>(this.API_URL + this.ENDPOINT_INSCRIPTION, credentials, { headers });
  }
  

   getAllUtilisateurs(){
     return this.httpClient.get(this.API_URL + this.ENDPOINT_UTILISATEURS);
   }

   searchUserByPseudo(pseudo: string): Observable<any> {
    const url = `${this.API_URL}/pseudo?pseudo=${pseudo}`;
    return this.httpClient.get(url);
  }

  sendMessage(recipientUserId: number, messageContent: string): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    const senderUserId = this.getLoggedInUserId();

    const body = {
        idReceiver: recipientUserId,
        idSender: senderUserId, // Cette valeur sera définie côté serveur
        message: messageContent,
        heure: new Date(), // Cette valeur sera définie côté serveur
    };

    return this.httpClient.post<any>(this.API_URL + '/messagerie', body, { headers });
  }

  getMessagesBetweenUsers(idSender: number, idReceiver: number): Observable<any> {
    const url = `${this.API_URL}/messagerie?idSender=${idSender}&idReceiver=${idReceiver}`;
    return this.httpClient.get(url);
  }
  


   // Ajout de la méthode de déconnexion
  deconnexion(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.post<any>(this.API_URL + this.ENDPOINT_DECONNEXION, {}, { headers });
  }
}
