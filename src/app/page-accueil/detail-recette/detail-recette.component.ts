import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {RECETTES} from '../mock-recette'
import { Recette } from '../recette';


@Component({
  selector: 'app-detail-recette',
  templateUrl: './detail-recette.component.html',
  styleUrls: ['./detail-recette.component.scss']
})
export class DetailRecetteComponent {

  recetteList: Recette[] | undefined;
  recette: Recette | undefined;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){
    this.recetteList = RECETTES;
    const recetteId: string|null = this.route.snapshot.paramMap.get('id');
   
    if(recetteId){
      this.recette = this.recetteList.find(recette => recette.idRecette == +recetteId);
    }
    
  }

  goToAccueil(){
    this.router.navigate(['/accueil']);
  }
}
