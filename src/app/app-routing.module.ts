import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  {path: 'profil', component: ProfilComponent},
  {path: '', redirectTo: '/profil', pathMatch:'full'},
  {path: 'message', component: MessageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
