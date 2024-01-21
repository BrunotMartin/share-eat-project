import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from './user/user.service';
import { ProfilComponent } from './profil/profil.component';
import { MenuComponent } from './page-accueil/menu/menu.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageAccueilModule } from './page-accueil/page-accueil.module';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, ProfilComponent, MenuComponent, MessageComponent],
  imports: [BrowserModule, PageAccueilModule, AppRoutingModule, HttpClientModule],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
