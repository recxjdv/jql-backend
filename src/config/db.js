const monk = require('monk');

const db = monk(process.env.MONGO_URI);

db.addMiddleware(require('monk-middleware-timestamps'));

const events = db.get('events');

module.exports = events;
