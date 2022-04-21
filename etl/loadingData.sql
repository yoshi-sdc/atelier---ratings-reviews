\COPY reviews (id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness) FROM 'reviews.csv' DELIMITER ',' CSV HEADER;

\COPY reviews_photos (id,review_id,url) FROM 'reviews_photos.csv' DELIMITER ',' CSV HEADER;

\COPY characteristics (id,product_id,name) FROM 'atelier-RatingsReviews/csv/characteristics.csv' DELIMITER ',' CSV HEADER;

\COPY characteristics (id,characteristic_id,review_id,value) FROM 'atelier-RatingsReviews/csv/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;