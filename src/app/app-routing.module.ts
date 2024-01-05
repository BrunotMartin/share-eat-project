import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { DetailRecetteComponent } from './detail-recette/detail-recette.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'accueil', component: AccueilComponent},
  {path: 'recette/:id', component: DetailRecetteComponent},
  {path: '', redirectTo: 'accueil', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
