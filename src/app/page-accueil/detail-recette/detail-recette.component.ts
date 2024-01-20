import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import {RECETTES} from '../mock-recette'
import { Recette } from '../recette';
import { RecetteService } from '../recette.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-recette',
  templateUrl: './detail-recette.component.html',
  styleUrls: ['./detail-recette.component.scss']
})
export class DetailRecetteComponent {

  //recetteList: Recette[] | undefined;
  recette: Recette | undefined;
  private subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private recetteService: RecetteService) { }

  ngOnInit(){
    //this.recetteList = RECETTES;
    const recetteId: string|null = this.route.snapshot.paramMap.get('id');
   
    if(recetteId){
      this.subscription = this.recetteService.getRecetteById(+recetteId).subscribe({
        next: (rec: Recette) => {
          this.recette = rec;
        },
        error: error => {
          console.error('Error fetching recette:', error);
        }
      });    }
    
  }

  goToAccueil(){
    this.router.navigate(['/accueil']);
  }
}
