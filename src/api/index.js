// API router
const express = require('express');

// Import the routes
const events = require('./events');
const lookup = require('./lookup');

const router = express.Router();

router.get('/', (req, res) => {
  const baseUri = '/';
  res.redirect(baseUri);
});

// Mount the routes
router.use('/events', events);
router.use('/lookup', lookup);

// Exports
module.exports = router;
