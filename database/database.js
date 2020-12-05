const mysql = require('mysql');

const connection = mysql.createConnection({
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

connection.connect(function (err) {
  if (err) {
    console.error('MySQL connection failed: ' + err.stack);
    return;
  };
});

module.exports = connection;