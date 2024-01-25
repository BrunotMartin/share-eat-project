import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { RECETTES } from '../mock-recette';
import { Recette } from '../recette';
import { RecetteService } from '../recette.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit{

  recetteList: Recette[] = []; // = RECETTES;
  
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
  
  selectedRecette: any;
  private subscription: Subscription | undefined;

  openModal(recette: any) {
    this.selectedRecette = recette;
  }

  closeModal() {
    this.selectedRecette = null;
  }


  constructor(
    private router: Router,
    private recetteService: RecetteService
    ){ }

  ngOnInit(){
    this.subscription = this.recetteService.getRecetteList().subscribe({
      next: (recettes: Recette[]) => {
        this.recetteList = recettes.reverse();
      },
      error: error => {
        console.error('Error fetching recettes:', error);
      }
    });
    //this.recetteList = this.recetteService.getRecetteList();
  }

  goToRecette(recette: Recette){
    this.router.navigate(['/recette', recette.idRecette]);
  }
}
