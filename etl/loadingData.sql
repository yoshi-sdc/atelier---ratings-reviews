\COPY reviews (id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness) FROM '/Users/ryd/Desktop/untitled folder/hackReactor/sdc-Yoshi/atelier-RatingsReviews/csv/reviews.csv' DELIMITER ',' CSV HEADER;

\COPY photos (id,review_id,url) FROM '/Users/ryd/Desktop/untitled folder/hackReactor/sdc-Yoshi/atelier-RatingsReviews/csv/reviews_photos.csv' DELIMITER ',' CSV HEADER;

\COPY characteristics (id,product_id,name) FROM '/Users/ryd/Desktop/untitled folder/hackReactor/sdc-Yoshi/atelier-RatingsReviews/csv/characteristics.csv' DELIMITER ',' CSV HEADER;

\COPY characteristic_reviews (id,characteristic_id,review_id,value) FROM '/Users/ryd/Desktop/untitled folder/hackReactor/sdc-Yoshi/atelier-RatingsReviews/csv/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;