import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../authentification.service'; 
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthentificationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  user = {
    email: '',
    password: ''
  };


  onSubmit() {
    
    this.authService.login(this.user.email, this.user.password).subscribe({
      next: (success) => {
        if (success) {
          console.log('Authentification réussie');
          // Redirigez vers la page d'inscription en cas de succès
          this.router.navigate(['/inscription']);
        } else {
          console.log('Échec de l\'authentification');
          // Affichez un message d'erreur à l'utilisateur
        }
      },
      error: (error) => {
        console.error('Erreur lors de l\'authentification', error);
    
        if (error.status === 401) {
          // Gérer le cas où les identifiants sont incorrects
          console.log('Identifiants incorrects');
        } else {
          // Gérer d'autres erreurs
          console.log('Erreur inattendue lors de l\'authentification');
        }
      }
    });
  }
}