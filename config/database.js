//------for initianing connection with database-----------
require('dotenv').config();
const mongoose = require('mongoose');
const session = require("express-session")
const MongoStore = require('connect-mongo')(session);

const mongo_key = process.env.MONGO_DATA_ID
const mongo_pass = process.env.MONGO_DATA_PASSWORD
mongoose.connect(`mongodb+srv://${mongo_key}:${mongo_pass}@servicedogsdata.rqqzgfu.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully');
});

module.exports = {db,session, MongoStore, mongoose};
