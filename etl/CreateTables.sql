CREATE TABLE IF NOT EXISTS reviews(
  id SERIAL PRIMARY Key,
  product_id INTEGER DEFAULT NULL,
  rating INTEGER NULL DEFAULT NULL,
  date bigint NULL DEFAULT NULL,
  summary VARCHAR NULL DEFAULT NULL,
  body VARCHAR NULL DEFAULT NULL,
  recommend boolean NULL DEFAULT NULL,
  reported boolean NULL DEFAULT NULL,
  reviewer_name VARCHAR NULL DEFAULT NULL,
  reviewer_email VARCHAR NULL DEFAULT NULL,
  response VARCHAR NULL DEFAULT NULL,
  helpfulness VARCHAR NULL DEFAULT NULL
);


CREATE TABLE IF NOT EXISTS photos (
  id SERIAL NOT NULL PRIMARY KEY,
  review_id INTEGER references reviews(id),
  url  VARCHAR NULL DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS characteristics (
  id SERIAL PRIMARY Key,
  product_id int,
  name VARCHAR
);


CREATE TABLE IF NOT EXISTS characteristic_reviews (
  id SERIAL NOT NULL PRIMARY key,
  characteristic_id INTEGER,
  review_id INTEGER references reviews(id),
  value INTEGER
);
