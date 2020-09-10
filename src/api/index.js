// API router
const express = require('express');

// Import the routes

const router = express.Router();

router.get('/', (req, res) => {
  // Redirect for API
  // const baseUri = '/';
  // res.redirect(baseUri);
  res.json({
    message: 'api working'
  });
});

// Mount the routes

// Exports
module.exports = router;
