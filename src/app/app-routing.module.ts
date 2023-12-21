import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { authGuard } from './auth.guard';


const routes: Routes = [
  {path: 'inscription', component: InscriptionComponent, canActivate: [authGuard] },
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
