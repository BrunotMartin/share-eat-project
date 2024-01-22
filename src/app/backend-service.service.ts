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

  constructor(private httpClient : HttpClient) {  }

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

   // Ajout de la méthode de déconnexion
  deconnexion(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.post<any>(this.API_URL + this.ENDPOINT_DECONNEXION, {}, { headers });
  }
}
