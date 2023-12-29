import { Component, OnInit } from '@angular/core';
import { RECETTES } from '../mock-recette';
import { Recette } from '../recette';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent {

  recetteList: Recette[] = RECETTES;

  ngOnInit(){
    console.table(this.recetteList);
  }
}
