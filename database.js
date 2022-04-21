const fs = require('fs');
const Pool = require('pg').Pool;
const fastcsv = require('fast-csv');

let stream = fs.createReadStream("reviews.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on('data', function(data) {
    csvData.push(data);
  })
  .on('end', function() {
    csvData.shift();


// create a new connection pool to the database

  const pool = new Pool({
    host: process.env.PGUSER,
    user: process.env.PGHOST,
    database: process.env.PGDB,
    password: process.env.PGWD,
    port: process.env.PGPORT
  });

  const query =
    "INSERT INTO results (id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness) "
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      csvData.forEach(row => {
        client.query(query, row, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            console.log('inserted ' + res.rowCount + ' row:', row);
          }
        });
      });
    } finally {
      done();
    }
  });
});

stream.pipe(csvStream);