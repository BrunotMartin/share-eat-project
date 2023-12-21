import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  // private apiUrl = 'http://mysql-shareeat.alwaysdata.net:3306/shareeat_bd'; // Remplacez par l'URL de votre API
  // private authTokenKey = 'authToken';

  // constructor(private http: HttpClient) {}

  isLoggedIn = false;
  redirectUrl = '';

  login(email: string, password: string): Observable<boolean> {
    // Envoyez une requête à votre API pour vérifier les identifiants
    const isLoggedIn = (email == 'calliclesbazolo@gmail.com' && password == 'Ilovese'); 

    return of(isLoggedIn).pipe(
      delay(1000),
      tap(isLoggedIn => this.isLoggedIn = isLoggedIn),
      tap(() => {
        if (isLoggedIn) {
          this.redirectUrl = ''; // Réinitialisez la redirectUrl après le login
        }
      })

    );
      
    // return this.http.post<boolean>(`${this.apiUrl}/login`, { email, password });
  }
  
  logout(){
    this.isLoggedIn = false
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  // setAuthToken(token: string): void {
  //   // Stockez le jeton d'authentification dans le stockage local (ou session)
  //   localStorage.setItem(this.authTokenKey, token);
  // }

  // getAuthToken(): string | null {
  //   // Récupérez le jeton d'authentification du stockage local
  //   return localStorage.getItem(this.authTokenKey);
  // }

  // clearAuthToken(): void {
  //   // Supprimez le jeton d'authentification du stockage local
  //   localStorage.removeItem(this.authTokenKey);
  // }

  // isAuthenticated(): boolean {
  //   // Vérifiez si le jeton d'authentification existe
  //   return !!this.getAuthToken();
  // }
}
