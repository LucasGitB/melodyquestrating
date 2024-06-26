import express from 'express';
import cors from 'cors';
import Rating from './Rating.js';
import Player from './Player.js';

const app = express();
const PORT = process.env.PORT || 3000;

import sequelize from './database.js';

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

// Middleware pour autoriser les requêtes CORS
app.use(cors());

// Route pour insérer un nouveau joueur ou mettre à jour le champ lastGame
app.post('/players', async (req, res) => {
  try {
    const playerData = req.body;

    // Vérifier si le joueur existe déjà
    const existingPlayer = await Player.findOne({ where: { playerId: playerData.playerId } });

    if (existingPlayer) {
      // Si le joueur existe déjà, mettre à jour le champ lastGame
      existingPlayer.set('lastGame', new Date());
      await existingPlayer.save(); // Enregistrer les modifications
      return res.status(200).json({ message: 'Player updated' });
    }

    // Si le joueur n'existe pas, procéder à l'insertion
    const newPlayer = await Player.create(playerData);
    res.status(201).json(newPlayer);
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route pour recuperer le dernier joueur
app.get('/last-player', async (req, res) => {
  try {
    const lastPlayer = await Player.findOne({
      order: [['lastGame', 'DESC']],
    });

    if (lastPlayer) {
      res.status(200).json({ lastPlayerId: lastPlayer.playerId });
    } else {
      res.status(404).json({ error: 'No players found' });
    }
  } catch (error) {
    console.error('Error fetching last player:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route pour noter un joueur
app.post('/ratings', async (req, res) => {
  try {
    const ratingData = req.body;
    const newRating = await Rating.create(ratingData);
    res.status(201).json(newRating);
  } catch (error) {
    console.error('Error creating rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route pour afficher toutes les notes
app.get('/ratings', async (req, res) => {
  try {
    // Récupérer toutes les évaluations
    const allRatings = await Rating.findAll();
    
    // Renvoyer les évaluations
    res.json(allRatings);
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route pour afficher toutes les évaluations pour un playerId spécifique
app.get('/ratings/:playerId', async (req, res) => {
  try {
    const playerId = req.params.playerId;
    
    // Récupérer toutes les évaluations associées à un playerId spécifique
    const playerRatings = await Rating.findAll({ where: { playerId: playerId } });
    
    // Vérifier si des évaluations ont été trouvées
    if (playerRatings.length === 0) {
      return res.status(404).json({ message: 'No ratings found for the playerId provided' });
    }
    
    // Renvoyer les évaluations trouvées
    res.json(playerRatings);
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/total-scores', async (req, res) => {
  try {
    const totalScores = await Rating.findAll({
      include: [
        {
          model: Player,
          attributes: ['playerName', 'playerId']
        }
      ],
      attributes: [
        ['playerId', 'ratingPlayerId'],
        [sequelize.fn('SUM', sequelize.col('score')), 'totalScore'],
        'Player.playerId',
        'Player.playerName'
      ],
      group: ['ratingPlayerId', 'Player.playerId', 'Player.playerName'],
      order: [['totalScore', 'DESC']] 
    });

    if (totalScores.length === 0) {
      return res.status(404).json({ message: 'No scores found' });
    }

    res.json(totalScores);
  } catch (error) {
    console.error('Error fetching total scores:', error);
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
