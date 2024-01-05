import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { MenuComponent } from './menu/menu.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { FooterComponent } from './footer/footer.component';
import { RecetteComponent } from './recette/recette.component';
import { AccueilComponent } from './accueil/accueil.component';
import { DetailRecetteComponent } from './detail-recette/detail-recette.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [AppComponent, HeroBannerComponent, MenuComponent, MainSectionComponent, FooterComponent, RecetteComponent, AccueilComponent, DetailRecetteComponent, PageNotFoundComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
