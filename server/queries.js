module.exports = {
  "getAllReviews": `SELECT r.id as review_id, r.rating, r.summary, r.recommend, r.response, r.body, r.date, r.reviewer_name, r.helpfulness, (
    SELECT
  json_agg(json_build_object(
  'id', p.id,
  'url', p.url
  ))
  FROM photos p
  WHERE p.review_id = 1) as photos
   FROM reviews r
  WHERE r.product_id = 2;`

  "getReviewMeta":


}