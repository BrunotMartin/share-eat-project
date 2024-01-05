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

  // ngOnInit(){
  //   console.table(this.recetteList);
  // }

  constructor(private router: Router){  }

  goToRecette(recette: Recette){
    this.router.navigate(['/recette', recette.idRecette]);
  }
}
