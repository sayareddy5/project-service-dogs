//------for initianing connection with database-----------
const mongoose = require('mongoose');
const session = require("express-session")
const MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://127.0.0.1:27017/servicedogs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully');
});

module.exports = {db,session, MongoStore};
