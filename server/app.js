const express = require('express');
const app = express();
const musician = require('./musician');
require('dotenv').config();

app.use('/musician', musician);
