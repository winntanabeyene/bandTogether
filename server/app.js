const express = require('express');
const app = express();
const musician = require('./musician');
const band = require('./band');
const listing = require('./listing');
require('dotenv').config();

app.use('/musician', musician);
app.use('/band', band);
app.use('/listing', listing);
