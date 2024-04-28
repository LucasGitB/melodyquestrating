import { DataTypes } from 'sequelize';
import sequelize from './database.js';
import Player from './Player.js';

const Rating = sequelize.define('Rating', {
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  playerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Players',
      key: 'playerId'
    }
  }
});

Rating.belongsTo(Player, { foreignKey: 'playerId' });

export default Rating;
