const fs = require('fs');
const Pool = require('pg').Pool;


// create a new connection pool to the database

  const pool = new Pool({
    host: 'localhost',
    user: 'ryd',
    database: 'reviews',
    password: '',
    port: 5432
  });



