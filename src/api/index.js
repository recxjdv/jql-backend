// API router
const express = require('express');

// Import the routes
const events = require('./events');

const router = express.Router();

router.get('/', (req, res) => {
  const baseUri = '/';
  res.redirect(baseUri);
});

// Mount the routes
router.use('/events', events);

// Exports
module.exports = router;
