const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'authentification_db',
  password: 'lari1234',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};