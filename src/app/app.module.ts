import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


// import { HeroBannerComponent } from './page-accueil/hero-banner/hero-banner.component';
// import { MenuComponent } from './page-accueil/menu/menu.component';
// import { MainSectionComponent } from './page-accueil/main-section/main-section.component';
// import { FooterComponent } from './page-accueil/footer/footer.component';
// import { RecetteComponent } from './recette/recette.component';
// import { AccueilComponent } from './page-accueil/accueil/accueil.component';
// import { DetailRecetteComponent } from './page-accueil/detail-recette/detail-recette.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageAccueilModule } from './page-accueil/page-accueil.module';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [BrowserModule, PageAccueilModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
