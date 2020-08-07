const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = callback => {
  MongoClient.connect(
   "mongodb connetion string"
  )
    .then(client => {
      console.log('Connected!');
      _db=client;
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};
const getDb = () => {
 if (_db) {
   console.log(_db);
   return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
