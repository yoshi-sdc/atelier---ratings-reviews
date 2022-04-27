const router = require('express').Router();

router.get((req, res) => {
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
}))
router.GET('/reviews/meta', 'somefunction')
router.POST('/reviews', 'somefunction')
router.PUT('/reviews/:review_id/helpful', 'somefunction')
router.PUT('/reviews/:review_id/report', 'somefunction')

module.exports = router

