// Imports
const app = require('./app');

// Declare constants
const host = process.env.HOST;
const port = process.env.PORT;

// Start express
app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening: http://${host}:${port}`);
});
