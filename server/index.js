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
  let count = req.body.count || '5';
  let page = 0;
  const queryInfo = `SELECT * FROM reviews WHERE product_id = ${product_id};`

  const queryTest3 = `SELECT reviews.*, photos.id, photos.url FROM reviews JOIN photos ON reviews.id = photos.review_id LIMIT 3;`

  // this works for getting the photos in array with id + url
  const photoQuery = `SELECT id, array_agg(url) as url FROM photos WHERE photos.review_id = 5 GROUP BY id;`

  const tests = `SELECT * FROM photos LIMIT 5;`


  const newQuery = `SELECT reviews.*, (SELECT id, array_agg(url) as url FROM photos WHERE photos.review_id = 5 GROUP BY id) as photos FROM reviews INNER JOIN photos ON reviews.id = photos.review_id WHERE reviews.product_id = 2 GROUP BY reviews.id LIMIT 7;`

  // const newQuery = `SELECT reviews.*
  //   FROM reviews
  //   JOIN (SELECT id, review_id, array_agg(url) as url
  //   FROM photos WHERE photos.review_id = 5 GROUP BY id) as photos
  //   ON reviews.id = photos.review_id
  //   WHERE reviews.product_id = 2 GROUP BY reviews.id LIMIT 7;`

    const reviewQuery = 'SELECT reviews.*, photos.id, array_agg(url) as photos FROM reviews JOIN photos ON reviews.id = photos.review_id WHERE product_id = 2 GROUP BY reviews.id, photos.id LIMIT 5;'

//   const information = {
//     'product': product_id,
//     'page': page,
//     'count': count,
//     'results': []
// }

  pool
    .query(newQuery)
    .then(data => res.send(data.rows))
    // .then(data => {
    //   let dataArray = []
    //   let results;
    //   const testing = data.rows.map((item) => {
    //     results = {
    //     'review_id': item.id,
    //     'rating': item.ratings,
    //     'summary': item.summary,
    //     'recommdend': item.recommend,
    //     'response': item.response,
    //     'body': item.body,
    //     'date': item.date,
    //     'reviewer_name': item.reviewer_name,
    //     'helpfulness': item.helpfulness,
    //     'photos': []
    //     }
    //   results.photos.push({'id': item.id, 'url': item.url})
    //   console.log(results, 'this is results')
    //   information.results.push(results)
    // })
    //   res.send(information)
    // })
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

  pool
    .query(queryTest1)
    .then(data => {
      res.send(data.rows)
    })
    .catch(err => console.log(err));
})

app.post('/reviews/', (req, res, next) => {
  let product_id = req.body.product_id;
  console.log(req.body, 'this is params')
  // INSERT IN TO TABLE

  pool
    .query()
    .then(data => {
      // res.send(data.rows)
      console.log('sucessfully posted')
    })
    .catch(err => console.log(err));
})

app.put('/reviews/:review_id/helpful', (req, res, next) => {
  console.log(req.body, 'this is params')
  // UPDATE helpfulness in table for product_id

  pool
    .query()
    .then(data => {
      console.log('helpful')
      res.send(data.rows)
    })
    .catch(err => console.log(err));
})

app.put('/reviews/:review_id/report', (req, res, next) => {
  console.log(req.body, 'this is params')
  // UPDATE reported # in table

  pool
    .query()
    .then(data => {
      console.log('successfully posted')
      // res.send(data.rows)
    })
    .catch(err => console.log(err));
})


app.listen(port, () => console.log(`listening at http://localhost:${port}`))

// reviews query set up
// pool
// .query(queryTest3)
// .then(data => {
//   console.log(data.rows, 'this is data')
//   information.results = {
//     'review_id': data.rows[0].review_id,
//     'rating': data.rows[0].ratings,
//     'summary': data.rows[0].summary,
//     'recommdend': '',
//     'response': '',
//     'body': '',
//     'data': '',
//     'reviewer_name': '',
//     'helpfulness': '',
//     'photos': []
//     }
//   information.results.photos.push(data.rows[0].url)
//   res.send(information)
// })
// .catch(err => console.log(err))
// })

// const queryReview = 'SELECT reviews.id, reviews.rating, reviews.summary, reviews.recommend, reviews.response. reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness,
//  (SELECT ARRAY_TO_JSON(coalesce(ARRAY_AGG(photo), array[]::record[]))
//  FROM '

const test = `
SELECT reviews.*,
(
  SELECT array_to_json(coalesce(array_agg(url)))
  FROM
  (
    SELECT photos.id, photos.url
    FROM reviews
    INNER JOIN photos
    ON reviews.id = photos.review_id
    WHERE photos.review_id = reviews.id
    ) url
    ) as photos
  FROM reviews
  WHERE reviews.product_id = 2;`