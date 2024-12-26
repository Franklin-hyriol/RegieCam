import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Création de l'instance Sequelize
const sequelize = new Sequelize(
    "regiecam",
    "root",
    "fraklin15",
    {
        host: "localhost",
        dialect: 'mysql'
    }
);

export default sequelize;
