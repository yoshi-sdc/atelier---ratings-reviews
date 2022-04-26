require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;
const router = require('./routes')

var router = require('./routes.js');

app.use(express.json());
app.use('/reviews', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

module.exports = app;