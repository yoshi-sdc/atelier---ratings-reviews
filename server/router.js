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


SELECT
json_build_object(
'id', p.id,
'url', p.url
)
FROM photos p
WHERE p.review_id = 5;


// Reviews THIS ONE is CORRECT
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

//count testing CORRECT
SELECT r.rating,COUNT(*) AS ratings
FROM reviews r
WHERE r.product_id = 2
GROUP BY r.rating;

// RECOMMENDED CORRECT
with table2 as(
  SELECT r.recommend,COUNT(*) as count
  FROM reviews r
  WHERE r.product_id = 2
  GROUP BY r.recommend)

SELECT json_object_agg(table2.recommend, table2.count) as recommend
FROM table2;

//recommend count (I think it's right? F = (0: #?))
SELECT r.recommend, COUNT(*), json_object_agg(recommend) as recommended
FROM reviews r
WHERE r.product_id = 2
GROUP BY r.recommend;

/// example
SELECT json_object_agg(name, testing)  as characteristics
FROM
(SELECT c.name, json_build_object(
  'id', cr.id,
  'value', cr.value
) as testing
FROM characteristics c
JOIN characteristic_reviews cr
ON c.id = cr.characteristic_id
WHERE cr.review_id = 1
LIMIT 5) as test;


//ratings CORRECT
EXPLAIN ANALYZE
with table1 as(
SELECT r.rating,COUNT(*) as count
FROM reviews r
WHERE r.product_id = 2
GROUP BY r.rating)

SELECT json_object_agg((CAST(table1.rating AS integer)), table1.count) as ratings
from table1;



SELECT ratings, recommend
FROM (SELECT json_build_object(r.recommend, COUNT(*))
FROM reviews r
WHERE r.product_id = 2) as recommend;





// characteristic_reviews
SELECT * FROM characteristic_reviews LIMIT 5;

SELECT cr.id, cr.value
FROM characteristic_reviews cr
JOIN reviews r
ON cr.review_id = r.id
WHERE r.product_id = 2
LIMIT 5;

//characteristics
SELECT * FROM characteristics LIMIT 5;

// SELECT r.*, (
//   SELECT
// json_agg(json_build_object(
// 'id', p.id,
// 'url', p.url
// ))
// FROM photos p
// WHERE p.review_id = 5) as photos_url
//  FROM reviews r
// WHERE r.id = 5;

//testing for characteristics
SELECT id, name as testing FROM characteristics WHERE product_id = 1 LIMIT 5;

//testing close
SELECT c.name,
(SELECT json_build_object(
  'id', cr.id,
  'value', cr.value
)
FROM characteristic_reviews cr
WHERE cr.review_id = 2)
FROM characteristics c
WHERE c.product_id = 1
LIMIT 5;



// objects correctly modeled
(SELECT json_build_object(
  'id', cr.id,
  'value', cr.value
)
FROM characteristic_reviews cr
WHERE cr.review_id = 1)

// characteristics WORKS
SELECT testing
FROM
(SELECT c.name, json_build_object(
  'id', cr.id,
  'value', cr.value
) as testing
FROM characteristics c
JOIN characteristic_reviews cr
ON c.id = cr.characteristic_id
WHERE cr.review_id = 1
LIMIT 5) as test;


// third column with almost right format:
SELECT name, testing, substring(cast(json_build_object(name, testing) AS VARCHAR),2,length(cast(json_build_object(name, testing) AS VARCHAR))-1) as characteristics
FROM
(SELECT c.name, json_build_object(
  'id', cr.id,
  'value', cr.value
) as testing
FROM characteristics c
JOIN characteristic_reviews cr
ON c.id = cr.characteristic_id
WHERE cr.review_id = 1
LIMIT 5) as test;


// version 234
SELECT json_object_agg(name, testing)  as characteristics
FROM
(SELECT c.name, json_build_object(
  'id', cr.id,
  'value', cr.value
) as testing
FROM characteristics c
JOIN characteristic_reviews cr
ON c.id = cr.characteristic_id
WHERE cr.review_id = 1
LIMIT 5) as test;

// full reviews meta


//to json
SELECT
FROM
WHERE

SELECT table1.name, table1.json_build_object
FROM (
  SELECT c.name, json_build_object(
  'id', cr.id,
  'value', cr.value)
  FROM characteristics c
  JOIN characteristic_reviews cr ON c.id = cr.characteristic_id
  WHERE cr.review_id = 1
LIMIT 5) AS table1;



// working potentially characteristics WORKING
SELECT json_build_object('characteristic', newTable2) as newestTable
FROM (SELECT (json_build_object(name, jsoncolumn)) as newTable2
FROM (SELECT name, cr.id, cr.value, json_build_object(
  'id', cr.id,
  'value', cr.value) as jsoncolumn
  FROM characteristics c
  JOIN characteristic_reviews cr ON c.id = cr.characteristic_id
  WHERE cr.review_id = 1) as newtable1) as newerTable1;




SELECT newestTable
FROM (SELECT (json_build_object(name, jsoncolumn)) as newTable2
FROM (SELECT name, cr.id, cr.value, json_build_object(
  'id', cr.id,
  'value', cr.value) as jsoncolumn
  FROM characteristics c
  JOIN characteristic_reviews cr ON c.id = cr.characteristic_id
  WHERE cr.review_id = 1) as newtable1) as newestTable;


SELECT json_build_object(c.name, (
  'id', cr.id,
  'value', cr.value

FROM characteristic_reviews cr
WHERE cr.review_id = 2))
FROM characteristics c
LIMIT 5;


//