// express
require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3001;
const app = express();
const Pool = require('pg').Pool;


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
  let count = req.body.count || '5';
  let page = 0;


  // this works for getting the photos in array with id + url
  const photoQuery = `SELECT id, array_agg(url) as url FROM photos WHERE photos.review_id = 5 GROUP BY id;`

  const reviewQuery = `SELECT r.id as review_id, r.rating, r.summary, r.recommend, r.response, r.body, r.date, r.reviewer_name, r.helpfulness, (
    SELECT
  json_agg(json_build_object(
  'id', p.id,
  'url', p.url
  ))
  FROM photos p
  WHERE p.review_id = r.id) as photos
   FROM reviews r
  WHERE r.product_id = ${product_id}
  LIMIT ${count};`

  pool
    .query(reviewQuery)
    .then(data => {
      information = {
        'product': product_id,
        'page': page,
        'count': count,
        'results': data.rows
      }
      res.send(information)
    })

    .catch(err => console.log(err))
})

app.get('/reviews/meta', (req, res, next) => {
  // product_id
  let product_id = req.body.product_id;
  // LIMIT ${count}*
  let count = req.body.count;
  // sort by 'newest' = date; 'helpful' = helpfulness; 'relevent' = not sure what
  let sort = req.body.sort;


  const queryTest1 = `SELECT rating, recommend, photo FROM reviews JOIN photos WHERE product_id = ${product_id} && review.id = photos.id; `
  // query

  const reviewsMetaQuery = `with table1 as (
    SELECT table1.product_id, json_object_agg((CAST(table1.rating AS integer)), table1.count) as ratings
    FROM (
      SELECT r.product_id, r.rating,COUNT(*) as count
      FROM reviews r
      WHERE r.product_id = 1
      GROUP BY r.product_id, r.rating) as table1
    GROUP BY table1.product_id
  ),
  table2 as (
    SELECT table2.product_id, json_object_agg(table2.recommend, table2.count) as recommend
    FROM (
      SELECT  r.product_id, r.recommend,COUNT(*) as count
      FROM reviews r
      WHERE r.product_id = 1
      GROUP BY r.product_id, r.recommend) as table2
    GROUP BY table2.product_id
  ),
  table3 as(
    select c.product_id, json_object_agg(c.name, json_build_object(
      'id', cr.id,
      'value', cr.value
    ) ) as characteristics
    FROM characteristics c
    JOIN characteristic_reviews cr
    ON c.id = cr.characteristic_id
    WHERE c.product_id = 1
    GROUP BY c.product_id, cr.review_id
    LIMIT 1)

  SELECT table1.product_id, table1.ratings, table2.recommend, table3.characteristics
  FROM table1
  JOIN table2
  ON table1.product_id = table2.product_id
  JOIN  table3 ON table1.product_id = table3.product_id;`

  pool
    .query(reviewsMetaQuery)
    .then(data => {
      res.send(data.rows)
    })
    .catch(err => console.log(err));
})

app.post('/reviews', (req, res, next) => {
  let product_id = req.query.product_id;
  let rating = req.query.rating;
  let summary = req.query.summary;
  let body = req.query.body;
  let recommend = req.query.recommend
  let name = req.query.name;
  let email = req.query.email;
  // let timestamp = SELECT LOCALTIMESTAMP(0);


  console.log(req.query, 'this is reqbody')
  // INSERT IN TO TABLE

  const insertToTable = `
    INSERT INTO reviews
    (product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email, reported, helpfulness)
    VALUES
    (${product_id}, ${rating}, EXTRACT(EPOCH from CURRENT_TIMESTAMP)::bigint * 1000, '${summary}', '${body}', ${recommend}, '${name}', '${email}', false, 0)
    RETURNING rating;`;



  pool
    .query(insertToTable)
    .then(data => {
      console.log(data)
      res.send('sucessfully posted')
    })
    .catch(err => console.log(err));
})

app.put('/reviews/:review_id/helpful', (req, res, next) => {

  console.log(req, 'this is query')
  let review_id = req.params.review_id;

  const updateHelp = `UPDATE reviews
  SET helpfulness = helpfulness::int + 1
  WHERE reviews.id = ${review_id}
  RETURNING id;`

  pool
    .query(updateHelp)
    .then(data => {
      console.log('helpful')
      res.send(data.rows)
    })
    .catch(err => console.log(err));
})

app.put('/reviews/:review_id/report', (req, res, next) => {
  console.log(req, 'this is params')
  let review_id = req.params.review_id
  const report = `UPDATE reviews
  SET reported = True
  WHERE reviews.id = ${review_id}
  RETURNING id;`

  pool
    .query(report)
    .then(data => {
      console.log('successfully posted')
      res.send('successfully reported!')
    })
    .catch(err => console.log(err));
})


app.listen(port, () => console.log(`listening at http://localhost:${port}`))




