require('dotenv').config()
const Pool = require('pg').Pool;

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDB,
  password: process.env.PGPW,
  port: process.env.PGPORT
});

module.exports = pool;