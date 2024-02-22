import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Utilisateur } from './utilisateur';
import { A_like } from './a_like';

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
  readonly ENDPOINT_UTILISATEUR_BY_ID = '/utilisateur/';
  readonly ENDPOINT_LIKE = '/a_like';
  readonly ENDPOINT_GET_RECETTES_LIKES_BY_USER_ID = '/a_like/utilisateur/';

  readonly ENDPOINT_COMMENTAIRES = '/commentaires';

  private isAuthenticated = false;
  private loggedInUserId: number | null = null;
  private loggedInUserPrenom: string | null = null;
  private loggedInUserPseudo: string | null = null;
  loggedInUserIdSeb: number | undefined;

  

  constructor(private httpClient : HttpClient) {  }

  getLoggedInUserIdSeb(): number | undefined {
    return this.loggedInUserIdSeb;
  }


  setLoggedInUserIdSeb(userId: number | undefined): void {
    this.loggedInUserIdSeb = userId;
  }

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

  // Méthode pour récupérer le prénom de l'utilisateur connecté
  getPrenomUtilisateurConnecte(): string | null {
    return this.loggedInUserPrenom;
  }

  // Méthode pour récupérer le pseudo de l'utilisateur connecté
  getPseudoUtilisateurConnecte(): string | null {
    return this.loggedInUserPseudo;
  }

  

   login(credentials: { mail: string, mdp: string }): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
     return this.httpClient.post<any>(this.API_URL+this.ENDPOINT_LOGIN, credentials, { headers }).pipe(
      tap(response => {
        // Stockez le prénom et le pseudo après la connexion réussie
        this.loggedInUserPrenom = response.prenom;
        this.loggedInUserPseudo = response.pseudo;
      })
      );
     
   }

   registerUser(credentials: { nom: string, prenom: string, mail: string, mdp: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.post<any>(this.API_URL + this.ENDPOINT_INSCRIPTION, credentials, { headers });
  }
  








  
  getUtilisateurById(userId: number): Observable<Utilisateur> {
    const url = `${this.API_URL}${this.ENDPOINT_UTILISATEUR_BY_ID}${userId}`;
    return this.httpClient.get<Utilisateur>(url);
  }

  getRecettesByUserId(userId: number): Observable<A_like[]> {
    const url = `${this.API_URL}${this.ENDPOINT_GET_RECETTES_LIKES_BY_USER_ID}${userId}`;
    return this.httpClient.get<A_like[]>(url);
  }
  
  deleteLike(userId: number, idRecette: number): Observable<A_like[]> {
    const url = `${this.API_URL}${this.ENDPOINT_LIKE}/${userId}/${idRecette}`;
    return this.httpClient.delete<A_like[]>(url);
  }

  createLikeRecette(userId: number | undefined, recetteId: number | undefined): Observable<A_like> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const newLike: A_like = {
      idUtilisateur: userId,
      idRecette: recetteId
    };

    return this.httpClient.post<A_like>(this.API_URL + this.ENDPOINT_LIKE, newLike, { headers });
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

  getUserBio(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.API_URL}/utilisateurs/bio`);
  }


  getUtilisateurPhotoById(userId: number): Observable<string> {
    return this.httpClient.get<any>(`${this.API_URL}/idUtilisateurs?idUtilisateur=${userId}`).pipe(
      map((utilisateur: any) => utilisateur.photo)
    );
  }

  getUtilisateurBio(userId: number): Observable<string> {
    return this.httpClient.get<any>(`${this.API_URL}/idUtilisateurs?idUtilisateur=${userId}`).pipe(
      map((utilisateur: any) => utilisateur.bio)
    );
}

  


   // Ajout de la méthode de déconnexion
  deconnexion(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.post<any>(this.API_URL + this.ENDPOINT_DECONNEXION, {}, { headers });
  }
}


