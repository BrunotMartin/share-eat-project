import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';

import { ProfilComponent } from './profil/profil.component';
import { MessageComponent } from './message/message.component';

import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AccueilComponent } from './page-accueil/accueil/accueil.component';

const routes: Routes = [
  {path: 'accueil', component: AccueilComponent, canActivate: [AuthGuard]},
  {path: 'profil', component: ProfilComponent},
  {path: 'message', component: MessageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'inscription', component: InscriptionComponent },
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
 