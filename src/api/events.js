const express = require('express');
const Joi = require('joi');

// Data store
const events = require('../config/db');

// Helper functions
// const helpers = require('../helpers/helpers');
const { hashString } = require('../helpers/helpers');
// const { arrNoDupe } = require('../helpers/helpers');

// Establish the event schema
const createEventSchema = Joi.object({
  // method: jQuery method name (e.g. .html, .append etc)
  method: Joi.string().trim().required(),
  // protocol: Output of window.location.protocol in the browser
  protocol: Joi.string().trim().required(), // http or https?
  // hostname: Output of window.location.hostname in the browser
  hostname: Joi.string().trim().required(),
  // path: Output of window.location.pathname in the browser
  path: Joi.string().trim().required(),
  // href: Output of window.location.href in the browser
  href: Joi.string().uri().required(),
  // string: The value being passed into the method in the browser
  string: Joi.string().trim().required(),
  // debug: Stack trace from the browser
  debug: Joi.string().trim().required()
});

const router = express.Router();

// Read all
router.get('/', async (req, res, next) => {
  try {
    const items = await events.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// Read one
router.get('/:id', async (req, res, next) => {
  try {
    const searchId = req.params.id;
    const searchFilter = {
      _id: searchId
    };
    const item = await events.findOne(searchFilter);
    if (item) {
      res.json(item);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

// Create one
router.post('/', async (req, res, next) => {
  try {
    // Validate the body
    const value = await createEventSchema.validateAsync(req.body);

    // Add internal record elements
    value.count = 1;
    value.knownSafe = 0;
    value.stringHash = hashString(value.string);
    value.hashHrefString = hashString(`${value.href}|${value.string}|${value.debug}`);

    // Insert event record
    const inserted = await events.insert(value);
    if (inserted) {
      const message = `jQuery event successfully inserted, id: ${inserted._id}`;
      res.json({
        message
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

// Update one
// - full replacement of the item
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const searchFilter = {
      _id: id
    };
    // FIXME: This put should use a different Joi validation schema
    // TODO: Check on update that an updated timestamp is added by the monk middleware
    const value = await createEventSchema.validateAsync(req.body);
    const update = {
      $set: value
    };
    // Look to see if the item exists
    const item = await events.findOne(searchFilter);
    if (item) {
      const updated = await events.update(searchFilter, update);
      if (updated) {
        res.json(value);
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

// Delete one
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const searchFilter = {
      _id: id
    };
    // Look to see if the item exists
    const item = await events.findOne(searchFilter);
    if (item) {
      await events.remove(searchFilter);
      res.json({
        message: 'jQuery event successfully deleted'
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

// Export routes
module.exports = router;
