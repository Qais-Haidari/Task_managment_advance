// var cron = require("node-cron");
const express = require("express");
const Mongoose = require("mongoose");
const TaskAuth = require("../Model/TaskAuth");
const Task = require("../Model/Tasks");
const PrimaryTask = require("../Model/PrimaryTasks");
const PrimaryTaskAuth = require("../Model/PrimaryTaskAuth");
const { v4: uuidv4 } = require("uuid");
const Daily = require('./')

const moment = require("moment");

function MomentDate() {
  let date = new Date();
  let Dates = moment(date).format("YYYY-MM-DD");
  return Dates;
}

Mongoose.connect("mongodb://127.0.0.1:27017tasks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then((res) => console.log(`DB CONNECTED`))
  .catch((err) => console.log(`ERROR : ${err}`));

Daily();

// cron("0 0 2 * * *", function () {
// will run every day at 2:00 AM
// });
