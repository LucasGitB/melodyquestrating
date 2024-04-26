import { DataTypes } from 'sequelize';
import sequelize from './database.js';

const Player = sequelize.define('Player', {
  playerId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true // Définir playerId comme clé primaire
  },
  playerName: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default Player;
