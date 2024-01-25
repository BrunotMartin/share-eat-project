import { Component } from '@angular/core';
import { Recette } from '../page-accueil/recette';
import { RecetteService } from '../page-accueil/recette.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.scss']
})
export class AjoutComponent {

  newRecette: Recette = { 
  titre: '',
   description: '', 
   date: new Date(), 
   imageRecette: '', 
   idRecette: undefined, 
   idUtilisateur: 31, 
   ingr1: undefined, 
   ingr2: undefined, 
   ingr3: undefined, 
   ingr4: undefined, 
   ingr5: undefined, 
   //like: undefined, 
   //note: undefined 
  };

  constructor(private router: Router, private recetteService: RecetteService) {}

  createRecette() {
    this.recetteService.createRecette(this.newRecette).subscribe(
      (createdRecette: Recette) => {
        console.log('Recette created successfully:', createdRecette);
      },
      (error: any) => {
        console.error('Error creating recette:', error);
      }
    );
  }
}
