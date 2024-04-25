// Importez Sequelize pour définir le modèle
import { DataTypes } from 'sequelize';
import sequelize from './database.js';
// Définissez le modèle d'évaluation
const Rating = sequelize.define('Rating', {
  performer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

export default Rating;
