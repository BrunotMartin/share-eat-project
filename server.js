const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3306;

const connection = mysql.createConnection({
  host: 'mysql-shareeat.alwaysdata.net',
  user: 'shareeat',
  password: 'GUqZtB#X@TG8d4U',
  database: 'shareeat_bd'
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL : ', err);
  } else {
    console.log('Connecté à MySQL');
  }
});
  
// Ajoutez vos routes et logique de gestion ici

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
