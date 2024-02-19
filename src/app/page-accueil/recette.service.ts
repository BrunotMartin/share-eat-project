import { Injectable } from '@angular/core';
import { Recette } from './recette';
//import { RECETTES } from './mock-recette';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BackendServiceService } from '../backend-service.service';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  

  readonly API_URL = "http://localhost:8080";

  readonly ENDPOINT_RECETTES = "/recettes";

  readonly ENDPOINT_RECETTE_BY_ID = "/recette/";

  readonly ENDPOINT_CREATE_RECETTE = "/ajout";

  readonly ENDPOINT_COMMENTAIRES = '/commentaires';

  constructor(private httpClient: HttpClient, private backendService: BackendServiceService) {}


  getRecetteList(): Observable<Recette[]>{ //: Recette[]
    return this.httpClient.get<Recette[]>(this.API_URL + this.ENDPOINT_RECETTES);
    //return RECETTES;
  }

  getRecetteById(recetteId: number): Observable<Recette>{
    const url = `${this.API_URL}${this.ENDPOINT_RECETTE_BY_ID}${recetteId}`;
    return this.httpClient.get<Recette>(url);
    //return RECETTES.find(recette => recette.idRecette == recetteId);
  }

  createRecette(newRecette: Recette): Observable<Recette> {
    const url = `${this.API_URL}${this.ENDPOINT_CREATE_RECETTE}`;
    return this.httpClient.post<Recette>(url, newRecette);
  }

  getCommentaires(recetteId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}${this.ENDPOINT_COMMENTAIRES}?idRecette=${recetteId}`);
  }

  addCommentaire(newComment: any): Observable<any> {
    // Récupérez l'ID de l'utilisateur connecté à partir de BackendServiceService
    const userId = this.backendService.getLoggedInUserId();
    // Utilisez l'ID de l'utilisateur connecté pour ajouter le commentaire
    newComment.idUtilisateur = userId;
    const url = `${this.API_URL}/commentaires`;
    return this.httpClient.post<any>(url, newComment);
  }
  

  getUtilisateurById(userId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/idUtilisateurs?idUtilisateur=${userId}`);
  }

  getUtilisateurPhotoById(userId: number): Observable<string> {
    return this.httpClient.get<any>(`${this.API_URL}/idUtilisateurs?idUtilisateur=${userId}`).pipe(
      map((utilisateur: any) => utilisateur.photo)
    );
  }
  
}
