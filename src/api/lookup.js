const express = require('express');
const Joi = require('joi');

// Data store
const events = require('../config/db');

// Validation
// - Establish the lookup schema
const lookupPackage = Joi.object({
  // name: the name of the library
  name: Joi.string().trim().required(),
  // version: the version of the library
  version: Joi.string().trim().required()
});

const router = express.Router();

// Lookup package
router.post('/', async (req, res, next) => {
    try {
        // Validate the body
        const value = await lookupPackage.validateAsync(req.body);
        const message = `Lookup attempted`;
        res.json({
            message
        });
    } catch (error) {
      next(error);
    }
});


// Export routes
module.exports = router;