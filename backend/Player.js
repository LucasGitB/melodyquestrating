import { DataTypes } from 'sequelize';
import sequelize from './database.js';

const Player = sequelize.define('Player', {
  playerId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  playerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastGame: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  hooks: {
    beforeSave: (player, options) => {
      player.lastGame = new Date();
    }
  }
});

export default Player;
