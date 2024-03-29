const mongoose = require('mongoose');

class Database {
  constructor() {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'connection error:'));
    this.db.once('open', function() {
      console.log('connected to mongodb!');
    });
  }
}

const database = (module.exports = new Database());
