const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = JSON.parse(fs.readFileSync('./config.json'));

// Connect to mongodb
const Mongo = require('./utility/mongo');

// Get our API routes
const customer = require('./routes/customer');
const partner = require('./routes/partner');

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

// Store sessions
app.use(session({
  store: new MongoStore({
    url: config.mongo.url,
  }),
  secret: 'auth-report',
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    expires: new Date(253402300000000),
  },
}));

// ONLY IF CROSS ORIGIN REQUEST IS ALLOWED
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Set our api routes
app.use('/customer', customer);
app.use('/partner', partner);
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || config.server.port || '4000';

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, () => console.log(`App running on 127.0.0.1:${port} 👍`));
