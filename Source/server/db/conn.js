const { MongoClient } = require("mongodb");
// require("dotenv").config({ path: "./config.env" });
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    
    client.connect();

    // get database
    const db = client.db('2LetItGo');

    // Verify we got a good "db" object
    if (db) {
        _db = db;
        console.log("Successfully connected to MongoDB."); 
    } else {
      return callback(err);
    }
         }, 

  getDb: function () {
    return _db;
  },
};