import { Injectable } from '@angular/core';
import { Recette } from './recette';
//import { RECETTES } from './mock-recette';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  

  readonly API_URL = "http://localhost:8080";

  readonly ENDPOINT_RECETTES = "/recettes";

  readonly ENDPOINT_RECETTE_BY_ID = "/recette/";

  constructor(private httpClient: HttpClient) {}


  getRecetteList(): Observable<Recette[]>{ //: Recette[]
    return this.httpClient.get<Recette[]>(this.API_URL + this.ENDPOINT_RECETTES);
    //return RECETTES;
  }

  getRecetteById(recetteId: number): Observable<Recette>{
    const url = `${this.API_URL}${this.ENDPOINT_RECETTE_BY_ID}${recetteId}`;
    return this.httpClient.get<Recette>(url);
    //return RECETTES.find(recette => recette.idRecette == recetteId);
  }
}
