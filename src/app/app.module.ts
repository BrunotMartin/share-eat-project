import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from './user/user.service';
 

//import { MenuComponent } from './page-accueil/menu/menu.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageAccueilModule } from './page-accueil/page-accueil.module';

import { MessageComponent } from './message/message.component';
import { ProfilComponent } from './profil/profil.component';

import { LoginComponent } from './login/login.component';
//import { FooterComponent } from './page-accueil/footer/footer.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { CommonModule } from '@angular/common';
import { AjoutComponent } from './ajout/ajout.component';

import { FavorisComponent } from './favoris/favoris.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GallerieComponent } from './gallerie/gallerie.component';

import { RechercheComponent } from './recherche/recherche.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, ProfilComponent, MessageComponent, LoginComponent, InscriptionComponent, AjoutComponent, FavorisComponent, GallerieComponent, RechercheComponent],
  imports: [BrowserModule, PageAccueilModule, AppRoutingModule, HttpClientModule, CommonModule, FormsModule, NgxPaginationModule],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}

