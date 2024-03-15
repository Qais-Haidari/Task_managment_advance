const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');

let User = new mongoose.Schema({
  Status: {
    type: Boolean,
    required: true,
    default: true,
  },
  ID: {
    type: Number,
    required: true,
  },
  First_Name: {
    type: String,
    required: true,
  },
  Last_Name: {
    type: String,
    required: false,
  },
  Email: {
    type: String,
    required: true,
  },
  Phone: {
    type: Number,
    required: true,
  },
  Start_of_business: {
    type: String,
    required: true,
  },
  End_of_business: {
    type: String,
    required: true,
  },
  Is_Admin: {
    type: Boolean,
    required: true,
  },
  Departments: {
    type: String,
    require: true,
  },
  DepartmentsAdmin: {
    type: String,
    require: false,
  },
  IC: {
    type: String,
    require: false,
  },
  Level: {
    type: Number,
    require: true,
  },
});
User.plugin(passportLocalMongoose);

module.exports = User = mongoose.model("Users", User);

