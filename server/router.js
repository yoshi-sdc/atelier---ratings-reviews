// this returns array for each id
SELECT
json_build_object(
'id', p.id,
'url', (
  SELECT json_agg( url) FROM ( SELECT * FROM photos p WHERE review_id = 5) as photo)
) as photo_urls
FROM photos p
WHERE p.review_id = 5;

// returns object with a url for each
SELECT
json_build_object(
'id', p.id,
'url', p.url
)
FROM photos p
WHERE p.review_id = 5;

// Reviews THIS ONE
SELECT r.*, (
  SELECT
json_agg(json_build_object(
'id', p.id,
'url', p.url
))
FROM photos p
WHERE p.review_id = 5) as photos_url
 FROM reviews r
WHERE r.id = 5;


// reviews/meta
SELECT r.product_id, count(r.rating ) FROM reviews r WHERE r.rating = 4 & r.product_id = 5 GROUP BY r.product_id LIMIT 3;

// reviews/meta/ratings product_id 2 has a lot of ratings
SELECT r.rating FROM reviews r WHERE r.product_id = 2;

SELECT json_agg(json_build_object(
  '4', count(r.rating),
  '2', count(r.rating)
))
FROM reviews r
WHERE r.product_id = 2;