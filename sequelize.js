// sequelize.js

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost', // Assurez-vous que localhost pointe vers l'adresse IP de votre conteneur Docker
  port: 5432, // Port par défaut de PostgreSQL
  username: 'postgres', // Nom d'utilisateur par défaut
  password: 'toto', // Mot de passe configuré dans votre docker-compose.yml
  database: 'postgres', // Nom de la base de données par défaut
});

export default sequelize;
