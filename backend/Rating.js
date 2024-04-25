import { DataTypes } from 'sequelize';
import sequelize from './database.js';
import Player from './Player.js';

const Rating = sequelize.define('Rating', {
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  playerId: { 
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Players',
      key: 'playerId' // Modifier la clé ici pour correspondre à la colonne de référence dans la table Players
    }
  }
});

export default Rating;
