import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize({
    dialect: 'sqlite',
    storage: '../db.sqlite',
    logging: false
  });

export default db;