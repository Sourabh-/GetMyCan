const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json'));
const MongoClient = require('mongodb').MongoClient;

let MongoApp;
(function() {
  let instance;
  MongoApp = function() {
    if (instance) {
      return instance;
    }

    instance = this;
    this.db = null;
    return instance;
  };

  MongoApp.prototype.connect = (cb) => {
    if (this.db) {
      cb(this.db);
    }

    MongoClient.connect(config.mongo.url, {useNewUrlParser: true})
        .then((db) => {
          this.db = db;
          cb(db);
        })
        .catch((err) => {
          console.log(err);
          process.exit();
        });
  };
}());

module.exports = MongoApp;
