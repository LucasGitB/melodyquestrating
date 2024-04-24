// database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'postgres', 
    username: 'postgres', 
    password: 'toto', 
    host: 'localhost', 
    port: 5432, 
    database: 'postgres' 
});

export default sequelize;
