const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3306;

app.use(express.json());

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

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // logique d'authentification avec la base de données
  const query = `SELECT * FROM Utilisateurs WHERE Mail = ? AND Mdp = PASSWORD(?)`;
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'authentification', err);
      res.status(500).send('Erreur lors de l\'authentification');
    } else {
      if (results.length > 0) {
        res.status(200).send(true); // Authentification réussie
      } else {
        res.status(401).send(false); // Identifiants incorrects
      }
    }
  });
});
  

process.on('SIGINT', () => {
  connection.end();
  process.exit();
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
