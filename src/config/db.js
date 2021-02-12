const fs = require('fs');
const monk = require('monk');

// Helper functions
const { hashString } = require('../helpers/helpers');

// Import env properties
const db = monk(process.env.MONGO_URI);
const knownSafeFile = process.env.KNOWN_SAFE;
const vulnerableVersionData = process.env.VULNERABLE_VERSION_DATA;

const events = db.get('events');
const lookup = db.get('lookup');

// Create an async function to import the data
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
function importKnownSafeStrings() {
  // Import the known safe strings file
  const importKnownSafe = fs.readFileSync(knownSafeFile);
  const knownSafeStrings = JSON.parse(importKnownSafe);

  knownSafeStrings.safeStrings.forEach(async (safeString) => {
    const filter = {
      knownSafe: 1,
      string: safeString,
    };
    await events.findOne(filter, async (dbFindError, dbResponse) => {
      if (dbResponse === null) {
        const knownSafeDocument = {
          count: 1,
          knownSafe: 1,
          hrefStringHash: 'import',
          method: 'import',
          protocol: 'import',
          hostname: 'import',
          path: 'import',
          href: 'import',
          string: safeString,
          stringHash: hashString(safeString),
          debug: 'import',
        };
        await events.insert(knownSafeDocument);
      }
    });
  });
}

function importVulnerableVersionData() {
  const importVulnerableVersion = fs.readFileSync(vulnerableVersionData);
  const vulnerableVersions = JSON.parse(importVulnerableVersion);
  lookup.insert(vulnerableVersions);
}

importKnownSafeStrings();
//importVulnerableVersionData();

module.exports = events;
