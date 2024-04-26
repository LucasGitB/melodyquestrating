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
  },
  lastGame: {
    type: DataTypes.DATE,
    allowNull: true // Autoriser la valeur null pour lastGame
  }
}, {
  hooks: {
    beforeSave: (player, options) => {
      player.lastGame = new Date();
    }
  }
});

export default Player;
