import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import {RECETTES} from '../mock-recette'
import { Recette } from '../recette';
import { RecetteService } from '../recette.service';
import { Subscription } from 'rxjs';
import { BackendServiceService } from '../../backend-service.service';
import { Utilisateur } from 'src/app/utilisateur';

@Component({
  selector: 'app-detail-recette',
  templateUrl: './detail-recette.component.html',
  styleUrls: ['./detail-recette.component.scss']
})
export class DetailRecetteComponent {

  //recetteList: Recette[] | undefined;
  recette: Recette | undefined;
  idUser: number | undefined;
  private subscription: Subscription | undefined;
  utilisateur: Utilisateur | undefined;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private recetteService: RecetteService,
    private backendService: BackendServiceService) { }


  ngOnInit(){
    //this.recetteList = RECETTES;
    const recetteId: string|null = this.route.snapshot.paramMap.get('id');
   
    if(recetteId){
      this.subscription = this.recetteService.getRecetteById(+recetteId).subscribe({
        next: (rec: Recette) => {
          this.recette = rec;
          this.idUser = rec.idUtilisateur;

          if (this.idUser !== undefined) {
            this.getUtilisateurById(this.idUser);
          }
        },
        error: error => {
          console.error('Error fetching recette:', error);
        }
      }); 
      
     
    
    }
    
  }

  getUtilisateurById(userId: number) {
    this.backendService.getUtilisateurById(userId).subscribe({
      next: (user: Utilisateur) => {
        this.utilisateur = user;
        //console.log('User:', user);
      },
      error: error => {
        console.error('Error fetching utilisateur:', error);
      }
    });
  }

  goToAccueil(){
    this.router.navigate(['/accueil']);
  }
}