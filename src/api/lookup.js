const express = require('express');
const { ValidationError } = require('joi');
const Joi = require('joi');

// Data store
const lookup = require('../config/db');

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
        console.log(value.name);
        console.log(value.version);

        // Lookup in the database
        const searchFilter = {
            name: value.name,
            version: value.version
        };
        const packageData = await lookup.findOne(searchFilter);
        let foundMessage = {
            state: ''
        };
        if (packageData) {
            console.log(packageData);
            if (packageData.state === false) {
                console.log('false - ok');
                foundMessage.state = 'ok'
            } else {
                console.log('!false - vulnerable');
                foundMessage.state = 'vulnerable'
            }
            res.json(foundMessage);
        } else {
            foundMessage.state = 'not found';
            res.json(foundMessage);
        }
    } catch (error) {
      next(error);
    }
});


// Export routes
module.exports = router;