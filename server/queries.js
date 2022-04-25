// Reviews THIS ONE is CORRECT
EXPLAIN ANALYZE
SELECT r.id as review_id, r.rating, r.summary, r.recommend, r.response, r.body, r.date, r.reviewer_name, r.helpfulness, (
  SELECT
json_agg(json_build_object(
'id', p.id,
'url', p.url
))
FROM photos p
WHERE p.review_id = 5) as photos
 FROM reviews r
WHERE r.product_id = 2;

// RATINGS CORRECT
with table1 as(
  SELECT r.product_id, r.rating,COUNT(*) as count
  FROM reviews r
  WHERE r.product_id = 2
  GROUP BY r.product_id, r.rating)

  SELECT table1.product_id, json_object_agg((CAST(table1.rating AS integer)), table1.count) as ratings
  FROM table1
  GROUP BY table1.product_id;

// RECOMMENDED CORRECT
with table2 as(
  SELECT r.product_id, r.recommend,COUNT(*) as count
  FROM reviews r
  WHERE r.product_id = 2
  GROUP BY r.product_id, r.recommend)

SELECT table2.product_id, json_object_agg(table2.recommend, table2.count) as recommend
FROM table2
GROUP BY table2.product_id;

// characteristics CORRECT
SELECT cr.review_id, characteristics
FROM (SELECT json_object_agg(name, testing)  as characteristics
FROM
(SELECT c.name, json_build_object(
  'id', cr.id,
  'value', cr.value
) as testing
FROM characteristics c
JOIN characteristic_reviews cr
ON c.id = cr.characteristic_id
WHERE cr.review_id = 1
LIMIT 5) as test);


with table4 as(
select c.product_id, json_object_agg(c.name, json_build_object(
  'id', cr.id,
  'value', cr.value
) ) as characteristics
FROM characteristics c
JOIN characteristic_reviews cr
ON c.id = cr.characteristic_id
WHERE c.product_id = 1
GROUP BY c.product_id, cr.review_id
LIMIT 5)


select * from table4 limit 1;

// testing review query
SELECT product_id, ${page} as page, ${count} as count, results
FROM (SELECT r.*, (
  SELECT
json_agg(json_build_object(
'id', p.id,
'url', p.url
))
FROM photos p
WHERE p.review_id = 5) as photos
FROM reviews r
WHERE r.id = 5) as results;

// product, page


//test for meta (all)
with table1 as(
  SELECT r.rating,COUNT(*) as count
  FROM reviews r
  WHERE r.product_id = 2
  GROUP BY r.rating)

  SELECT json_object_agg((CAST(table1.rating AS integer)), table1.count) as ratings
  from table1,
)
table2 as(
  SELECT r.recommend,COUNT(*) as count
  FROM reviews r
  WHERE r.product_id = 2
  GROUP BY r.recommend)

SELECT json_object_agg(table2.recommend, table2.count) as recommend
FROM table2
)

SELECT table1.ratings
FROM table1;



with table1 as(
  SELECT r.rating,COUNT(*) as count
  FROM reviews r
  WHERE r.product_id = 2
  GROUP BY r.rating)

  SELECT json_object_agg((CAST(table1.rating AS integer)), table1.count) as ratings
  from table1
)
select * from table1

SELECT r.rating,COUNT(*) as count
  FROM reviews r
  WHERE r.product_id = 2
  GROUP BY r.product_id, r.rating

  SELECT json_object_agg((CAST(r.rating AS integer)), count) as ratings





  SELECT json_object_agg((CAST(table1.rating AS integer)), table1.count) as ratings
  from (SELECT r.rating,COUNT(*) as count
  FROM reviews r
  WHERE r.product_id = 2
  GROUP BY r.product_id, r.rating) as table1;



SELECT json_object_agg(table2.recommend, table2.count) as recommend
FROM (SELECT r.recommend,COUNT(*) as count
FROM reviews r
WHERE r.product_id = 2
GROUP BY r.recommend) as table2

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




// combine the three tables
with table1 as (
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

SELECT table1.ratings, table2.recommend, table3.characteristics
FROM table1
JOIN table2
ON table1.product_id = table2.product_id
JOIN  table3 ON table1.product_id = table3.product_id












