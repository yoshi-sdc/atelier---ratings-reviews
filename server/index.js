require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const pool = require('./database.js')
const helper = require('./queryfunctions.js')


app.use(express.json());
app.get('/', () => res.send('connected to server'))
app.get('/reviews', helper.getAllReviews)
app.get('/reviews/meta', helper.getReviewMeta)
app.post('/reviews', helper.postReview)
app.put('/reviews/:review_id/helpful', helper.addHelpful)
app.put('/reviews/:review_id/report', helper.reportReview)


app.listen(port, () => console.log(`listening at http://localhost:${port}`))

module.exports.app = app;

