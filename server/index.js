// express
require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3001;
const app = express();
const pool = require('./database.js')


app.use(express.json());


app.get('/reviews', (req, res, next) => {
  console.log(req.body)
  let product_id = req.body.product_id || 2;
  let count = req.body.count || '5';
  let page = 1;
  let sort = req.body.sort || 'newest';
  if (sort === 'newest') sort = 'ORDER BY r.date desc';
  if (sort === 'helpful') sort = 'ORDER BY r.helpfulness desc';
  if (sort === 'relevant') sort = 'ORDER BY r.helpfulness, r.date desc';


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
  WHERE r.product_id = ${product_id} AND r.reported = false
  ${sort}
  LIMIT ${count}
  OFFSET ${count * page - count};`

  pool
    .query(reviewQuery)
    .then(data => {
     let information = {
        'product': req.body.product_id,
        'page': page,
        'count': count,
        'results': data.rows
      }
      console.log(information.product, 'should equal 5')
      res.send(information)
    })

    .catch(err => console.log(err))
})

app.get('/reviews/meta', (req, res, next) => {
  console.log(req.body)
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

// app.post('/reviews', (req, res, next) => {
//   let product_id = req.query.product_id;
//   let rating = req.query.rating;
//   let summary = req.query.summary;
//   let body = req.query.body;
//   let recommend = req.query.recommend
//   let name = req.query.name;
//   let email = req.query.email;



//   console.log(req.query, 'this body')

//   const insertToTable = `
//     INSERT INTO reviews
//     (product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email, reported, helpfulness)
//     VALUES
//     (${product_id}, ${rating}, cast(to_char((current_timestamp)::TIMESTAMP,'yyyymmddhhmiss') as BigInt), '${summary}', '${body}', ${recommend}, '${name}', '${email}', false, 0)
//     RETURNING rating;`;



//   pool
//     .query(insertToTable)
//     .then(data => {
//       console.log(data)
//       res.send('sucessfully posted')
//     })
//     .catch(err => console.log(err));
// })

app.put('/reviews/:review_id/helpful', (req, res, next) => {

  // console.log(req, 'this is query')
  let review_id = req.params.review_id;

  const updateHelp = `UPDATE reviews
  SET helpfulness = helpfulness::int + 1
  WHERE reviews.id = ${review_id};`

  pool
    .query(updateHelp)
    .then(data => {
      console.log('helpful')
      res.send('helpful')
    })
    .catch(err => console.log(err));
})

app.put('/reviews/:review_id/report', (req, res, next) => {
  let review_id = req.params.review_id
  const report = `UPDATE reviews
  SET reported = True
  WHERE reviews.id = ${review_id}
  RETURNING id;`

  pool
    .query(report)
    .then(data => {
      console.log('successfully reported')
      res.send('successfully reported!')
    })
    .catch(err => console.log(err));
})

// app.post('/reviews', (req, res, next) => {
//   let characteristics = req.params.characteristics;
//   let review_id = req.params.review_id;

//   const postCharacteristics = `
//     INSERT INTO characteristics_reviews (review_id, characteristics_id, value) VALUES ()
//   ;`

//   pool
//     .query(postCharacteristics)
//     .then(() => res.send('characteristics posted'))
// })

// app.post('/reviews', (req, res, next) => {
//   let url = req.body.photos;
//   let review_id = req.params.review_id;
//   console.log(req.body, 'this is photos')

//   // const addPhotos = `
//   //   INSERT INTO photos (review_id, photos) SELECT url, review_id FROM UNNEST (${url}, ${review_id})
//   // ;`

//   pool
//     .query(addPhotos)
//     .then(() => res.send('photos posted'))
// })




//__________________________________________
app.post('/reviews', (req, res, next) => {
  let product_id = req.query.product_id;
  let rating = req.query.rating;
  let summary = req.query.summary;
  let body = req.query.body;
  let recommend = req.query.recommend
  let name = req.query.name;
  let email = req.query.email;

  let photos  = JSON.parse(req.query.photos);
  let characteristics = JSON.parse(req.query.characteristics);

  let ipad = (Object.values(characteristics))
  let nameValues = (Object.keys(characteristics))

  let idArray = ipad.map(item => item.id)
  let valueArray = ipad.map(item => item.value)
  // let valuesArray = charValues.map(item => item.value)

  console.log(nameValues, 'this is name array')
  console.log(idArray, 'this is keys')
  console.log(valueArray, 'this is values array')

  const addChars = `
    INSERT INTO characteristics (product_id, name)
    SELECT product_id, name FROM UNNEST ($1::int[], $2::text[]) as t (product_id, name)
      ;
  `;

  const addPhotos = ` INSERT INTO photos (url, review_id)
  SELECT url, review_id FROM UNNEST ($1::text[], $2::int[]) AS t (url, review_id)
  RETURNING review_id`;

  const addCharacteristics = `
   INSERT INTO characteristic_reviews (review_id, characteristic_id, value)
  SELECT review_id, characteristic_id, value FROM UNNEST ($1::int[], $2::int[], $3::decimal[]) AS t (review_id, characteristic_id, value)
  `;

  const insertToTable = `
    INSERT INTO reviews
    (product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email, reported, helpfulness)
    VALUES
    (${product_id}, ${rating}, cast(to_char((current_timestamp)::TIMESTAMP,'yyyymmddhhmiss') as BigInt), '${summary}', '${body}', ${recommend}, '${name}', '${email}', false, 0)
    RETURNING id`;

    pool
    .query(insertToTable)
    .then(data => {
      var review_id = data.rows[0]['id']
      // console.log(data.rows[0]['id'])
      pool.query(addPhotos, [photos, Array(photos.length).fill(review_id)])
      return review_id
    })
    .then(review_id => {
      pool
        .query(addCharacteristics, [Array(idArray.length).fill(review_id), idArray, valueArray])
        res.send('sucessfully posted')
    })
    .catch(err => res.send(err))

})

app.listen(port, () => console.log(`listening at http://localhost:${port}`))

module.exports.app = app;

