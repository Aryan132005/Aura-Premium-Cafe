const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');

const host = process.env.MYSQL_HOST || 'localhost';
const port = Number(process.env.MYSQL_PORT) || 3306;
const user = process.env.MYSQL_USER || 'root';
const password = process.env.MYSQL_PASSWORD || '';
const database = process.env.MYSQL_DATABASE || 'premium_cafe';

const dbPath = path.join(__dirname, '../cafe.sqlite');

let sequelizeInstance;

const initSQLite = () => {
  return new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: false
  });
};

const initMySQL = () => {
  return new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'mysql',
    logging: false,
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 }
  });
};

// Default initialize SQLite directly if explicitly instructed or fallback
sequelizeInstance = initSQLite();

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({ host, port, user, password, connectTimeout: 2000 });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end();

    const mysqlInstance = initMySQL();
    await mysqlInstance.authenticate();
    console.log(`✅ MySQL Database Connected: ${database} on ${host}:${port}`);
    
    // Rebind models to MySQL instance
    rebindModels(mysqlInstance);
    sequelizeInstance = mysqlInstance;
    await sequelizeInstance.sync({ alter: true });
    console.log('✅ Sequelize Models Synced with MySQL Tables');
  } catch (error) {
    console.warn(`⚠️ MySQL Not Connected (${error.message || 'Offline'}). Active Database: Embedded SQLite (cafe.sqlite)`);
    
    rebindModels(sequelizeInstance);
    await sequelizeInstance.authenticate();
    await sequelizeInstance.sync();
    console.log('✅ Embedded SQLite Database Active & Models Synced!');
  }
};

const rebindModels = (instance) => {
  // Ensure models use current active instance
  const modelsPath = path.join(__dirname, '../models');
  if (fs.existsSync(modelsPath)) {
    const files = fs.readdirSync(modelsPath);
    files.forEach(file => {
      if (file.endsWith('.js') && file !== 'associations.js') {
        const model = require(path.join(modelsPath, file));
        if (model && model.init && model.rawAttributes) {
          model.init(model.rawAttributes, {
            ...model.options,
            sequelize: instance
          });
        }
      }
    });
  }

  // Re-register associations lazily after models are initialized
  const setupAssociations = require('../models/associations');
  setupAssociations();
};

module.exports = {
  get sequelize() {
    return sequelizeInstance;
  },
  connectDB
};
