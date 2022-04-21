// express
require('dotenv').config();
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3001;
const app = express();
const Pool = require('pg').Pool;


app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());



const pool = new Pool({
  host: 'localhost',
  user: 'ryd',
  database: 'reviews',
  password: '',
  port: 5432
});


app.get('/reviews', (req, res, next) => {
  console.log(req.body, 'this is body')
  let product_id = req.body.product_id;
  const queryTest = `SELECT * FROM reviews WHERE product_id = ${product_id};`
  console.log(queryTest, 'queryTest')

  pool
    .query(queryTest)
    .then(data => {
      res.send(data.rows)
    })
    .catch(err => console.log(err))

})

app.get('/reviews/meta', (req, res, next) => {
  let product_id = req.body.product_id;
  const queryTest1 = `SELECT rating, recommend FROM reviews WHERE product_id = ${product_id}; `
  // query

  pool
    .query(queryTest1)
    .then(data => {
      res.send(data.rows)
    })
    .catch(err => console.log(err));
})

app.put('/reviews/:review_id/helpful', (req, res, next) => {
  console.log(req.body, 'this is params')
  // query

  pool
    .query()
    .then(data => {
      res.send(data.rows)
    })
    .catch(err => console.log(err));
})

app.listen(port, () => console.log(`listening at http://localhost:${port}`))