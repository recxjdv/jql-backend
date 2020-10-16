// Imports
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Remove header
app.disable('x-powered-by');

// Static contents
app.use('/', express.static('src/public'));

// API router
app.use('/api/v1', api);

// Error handling
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
