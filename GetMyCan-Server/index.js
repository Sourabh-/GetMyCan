const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json'));

// Connect to mongodb
const Mongo = require('./utility/mongo');

const mongoapp = new Mongo();
mongoapp.connect((db) => {
  console.log('Connected to Mongo DB 👍');
  app.db = db;
});

// Parsers for POST data
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false,
}));

// ONLY IF CROSS ORIGIN REQUEST IS ALLOWED
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || config.server.port || '4000';

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, () => console.log(`App running on 127.0.0.1:${port} 👍`));
