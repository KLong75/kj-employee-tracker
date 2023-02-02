
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your My SQL password: '',
    password: '*******',
    database: 'team'
});

module.exports = db;





