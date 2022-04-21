const fs = require('fs');
const Pool = require('pg').Pool;
const fastcsv = require('fast-csv');

// create a new connection pool to the database

  const pool = new Pool({
    host: 'localhost',
    user: 'ryd',
    database: 'reviews',
    password: '',
    port: 5432
  });


  const query = 'SELECT * FROM photos WHERE review_id = 5'

  pool.query(query, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      console.log('this is res: ', res)
    }
    pool.end();
  })
