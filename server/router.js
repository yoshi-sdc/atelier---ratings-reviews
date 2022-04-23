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

// attempt at nested
SELECT r.*, json_agg(
  SELECT
json_build_object(
'id', p.id,
'url', p.url
)
FROM photos p
WHERE p.review_id = 5) as photos_url
 FROM reviews r
WHERE r.id = 5;