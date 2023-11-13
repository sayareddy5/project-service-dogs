

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  imageUrl: {type: String},
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String},
  googleId: { type: String},
  age : {type: Number},
  date: { type: Date, default: Date.now },
  isAdmin: {type: Boolean, default: false},
  firstName: {type: String},
  lastName: {type: String},
  resetCode: { type: String },
  mobileNumber: {type: String},
}, {timestamps : true});

const User = mongoose.model('User', userSchema);

module.exports = User;


