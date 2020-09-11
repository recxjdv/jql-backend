const crypto = require('crypto');

module.exports = {

  // Console logging
  logger(message) {
    // eslint-disable-next-line no-console
    console.log(message);
  },

  // HTTP logging
  httpLog(method, url, context) {
    if (!context) {
      context = '-';
    }
    // eslint-disable-next-line no-console
    console.log(`${method} ${url} ${context}`);
  },

  // String hashing
  hashString(string) {
    const hashMethod = 'sha256';
    const digestType = 'hex';
    return crypto.createHash(hashMethod).update(string).digest(digestType);
  },

  // Unique an array
  // https://stackoverflow.com/questions/6940103/how-do-i-make-an-array-with-unique-elements-i-e-remove-duplicates
  arrNoDupe(srcArray) {
    const temp = {};
    for (let i = 0; i < srcArray.length; i += 1) {
      temp[srcArray[i]] = true;
    }
    return Object.keys(temp);
  },
};
