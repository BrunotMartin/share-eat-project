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

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, ProfilComponent, MessageComponent, LoginComponent, InscriptionComponent, AjoutComponent],
  imports: [BrowserModule, PageAccueilModule, AppRoutingModule, HttpClientModule, CommonModule, FormsModule],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
