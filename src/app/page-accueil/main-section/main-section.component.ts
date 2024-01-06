import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RECETTES } from '../mock-recette';
import { Recette } from '../recette';


@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent {

  recetteList: Recette[] = RECETTES;
  
  pageSize = 12; // Nombre d'éléments par page
  p = 1; // Page actuelle
  // ngOnInit(){
  //   console.table(this.recetteList);
  // }
  customLabels = {
    previousLabel: 'Précédent',
    nextLabel: 'Suivant',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: 'Vous êtes sur la page'
    // Ajoutez d'autres textes personnalisés si nécessaire
  };
  
  constructor(private router: Router){  }

  goToRecette(recette: Recette){
    this.router.navigate(['/recette', recette.idRecette]);
  }
}
