// var cron = require("node-cron");
const express = require("express");
const Mongoose = require("mongoose");
const TaskAuth = require("../Model/TaskAuth");
const Task = require("../Model/Tasks");
const PrimaryTask = require("../Model/PrimaryTasks");
const PrimaryTaskAuth = require("../Model/PrimaryTaskAuth");
const { v4: uuidv4 } = require("uuid");

Mongoose.connect("mongodb://127.0.0.1:27017tasks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then((res) => console.log(`DB CONNECTED`))
  .catch((err) => console.log(`ERROR : ${err}`));

const Create = async () => {
  const Daily_PrimaryTask = await PrimaryTask.find({
    Task_Recurrence: "Daily",
  });
  for (let index = 0; index < Daily_PrimaryTask.length; index++) {
    const element = Daily_PrimaryTask[index];
    let Daily_PriamryTask_Auth = [];
    for (let index = 0; index < Daily_PrimaryTask.length; index++) {
      Daily_PriamryTask_Auth[index] = await PrimaryTaskAuth.findOne({
        Task_ID: Daily_PrimaryTask[index].ID,
      });
    }
  }
  cl
};

Create();

// cron("0 0 0 * * *", function () {
//will run every day at 12:00 AM
// });
