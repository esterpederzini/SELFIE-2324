const { interval } = require("date-fns");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  idNumber: {
    type: Number,
    unique:true,
    required: true
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;