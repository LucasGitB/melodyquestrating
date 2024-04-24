// server.js

import express from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import User from './User.js';

const app = express();
const PORT = process.env.PORT || 3000;

import sequelize from './database.js';

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

// Middleware pour autoriser les requêtes CORS
app.use(cors());

// Route pour récupérer tous les utilisateurs
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route pour insérer un nouvel utilisateur
app.post('/users', async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await User.create(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Gestionnaire d'erreurs pour les routes non trouvées
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Synchroniser les modèles avec la base de données
    await sequelize.sync({ alter: true });

    // Lancer le serveur Express
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = app;