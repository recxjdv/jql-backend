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

// Static contents
app.get('/', (req, res) => {
  res.json({
    message: 'Get / worked okay!'
  });
});

// API router
app.use('/api/v1', api);

// Error handling
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
