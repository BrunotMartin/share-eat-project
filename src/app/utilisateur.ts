// utilisateur.model.ts

export interface Utilisateur {
    idUtilisateur: number;
    pseudo: string;
    prenom: string;
    nom: string;
    mail: string;
    mdp: string;
    bio: string;
    photo: string;
    // Add other properties as needed
}