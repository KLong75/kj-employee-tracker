const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your My SQL password: '',
    password: '4thBestCountryBand',
    database: 'team'
});

module.exports = db;





/*
const Sequelize = require('sequelize');


require('dotenv').config();

let sequelize;

if(process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: 'localhost',
  dialect: 'mysql2',
  port: 3306
 });
}

module.exports = sequelize;
*/