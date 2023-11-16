const mongoose = require('mongoose');
const {Comment, Like, Feed} = require("../models/userFeed")

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

userSchema.pre('remove', async function (next) {

  const userId = this._id;

  try {
    // Remove likes associated with the user
    await Like.deleteMany({ user: userId });

    // Remove comments associated with the user
    await Comment.deleteMany({ user: userId });

    // Remove feeds created by the user
    await Feed.deleteMany({ user: userId });

    next();
  } catch (error) {
    next(error);
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;


