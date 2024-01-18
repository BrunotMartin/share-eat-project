import { Injectable } from '@angular/core';
import { Recette } from './recette';
import { RECETTES } from './mock-recette';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  //constructor() { }

  getRecetteList(): Recette[]{
    return RECETTES;
  }

  getRecetteById(recetteId: number): Recette|undefined{
    return RECETTES.find(recette => recette.idRecette == recetteId);
  }
}
