const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const { Schema } = mongoose;

const UsersSchema = new Schema({
  email: String,
  hash: String,
  salt: String,
  userType:{type:Number,default:0}
});
const users = mongoose.model('Users', UsersSchema);

module.exports = users;