import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil/accueil.component';
import { DetailRecetteComponent } from './detail-recette/detail-recette.component';
import { FooterComponent } from './footer/footer.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { MenuComponent } from '../menu/menu.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

const accueilRoutes: Routes = [
  {path: 'accueil', component: AccueilComponent},
  {path: 'recette/:id', component: DetailRecetteComponent}
];

@NgModule({
  declarations: [
    AccueilComponent,
    DetailRecetteComponent,
    FooterComponent,
    HeroBannerComponent,
    MainSectionComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(accueilRoutes),
    NgxPaginationModule
  ]
})
export class PageAccueilModule { }
