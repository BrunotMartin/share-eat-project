import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private prenom: string;
  private identifiant: string;
  private biographie: string;

  constructor() {
    // Initialisation des données fictives de l'utilisateur
    this.prenom = 'Eric';
    this.identifiant = 'eric.yeaaah';
    this.biographie = "Le Lorem Ipsum est simplement du faux texte employé dans la composition";
  }

  getPrenom(): string {
    return this.prenom;
  }

  getIdentifiant(): string {
    return this.identifiant;
  }

  getBiographie(): string {
    return this.biographie;
  }

  setPrenom(nouveauPrenom: string): void {
    this.prenom = nouveauPrenom;
  }

  setBiographie(nouvelleBiographie: string): void {
    this.biographie = nouvelleBiographie;
  }
}
