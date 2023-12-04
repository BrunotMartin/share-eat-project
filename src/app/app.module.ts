import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from './user/user.service';
import { ProfilComponent } from './profil/profil.component';
import { MenuComponent } from './menu/menu.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [AppComponent, ProfilComponent, MenuComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatToolbarModule,MatListModule,],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
