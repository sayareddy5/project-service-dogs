

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age : {type: Number},
});

const User = mongoose.model('User', userSchema);
console.log("user-data",User)
console.log("In UserModel")
module.exports = User;


