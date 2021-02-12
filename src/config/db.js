const fs = require('fs');
const monk = require('monk');

// Helper functions
const { hashString } = require('../helpers/helpers');

// Import env event properties
const db = monk(process.env.MONGO_URI);
const knownSafeFile = process.env.KNOWN_SAFE;

const events = db.get('events');

// Import env lookup properties
const lookupDb = monk(process.env.MONGO_LOOKUP_URI);
const vulnerableVersionData = process.env.VULNERABLE_VERSION_DATA;

const lookup = lookupDb.get('lookup');

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

async function importVulnerableVersionData() {
  const importVulnerableVersion = fs.readFileSync(vulnerableVersionData);
  const vulnerableVersions = JSON.parse(importVulnerableVersion);
  for (var key in vulnerableVersions.trackedPackages) {
    let packageNameVersion = key;
    let [packageName, packageVersion] = packageNameVersion.split("|");
    packageVersion = packageVersion.replace(/_/g, '.');
    let packageState = vulnerableVersions.trackedPackages[key]
    const filter = {
      name: packageName, 
      version: packageVersion,
      state: packageState
    };
    await lookup.findOne(filter, async (dbFindError, dbResponse) => {
      if (dbResponse === null) {
        const storePackageInformation = {
          name: packageName,
          version: packageVersion,
          state: packageState
        };
        await lookup.insert(storePackageInformation);
      }
    });
  }
}

importKnownSafeStrings();
importVulnerableVersionData();

module.exports = events;
module.exports = lookup;
