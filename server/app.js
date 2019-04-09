const express = require('express');
const path = require('path');
const musician = require('./musician');
const band = require('./band');
const listing = require('./listing');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/musician', musician);
app.use('/band', band);
app.use('/listing', listing);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});