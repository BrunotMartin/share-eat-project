import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { UserService } from './user/user.service';
import { DeconnexionService } from './deconnecter/deconnecter.service';
import { SocketService } from './socket/socket.service';

import { ProfilComponent } from './profil/profil.component';
import { MenuComponent } from './menu/menu.component';
import { MessageComponent } from './message/message.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [AppComponent, ProfilComponent, MenuComponent, MessageComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule,],
  providers: [UserService, DeconnexionService, SocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
