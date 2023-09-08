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

let Daily_PriamryTask_Auth = [];
const Create = async () => {
  const Daily_PrimaryTask = await PrimaryTask.find({
    Task_Recurrence: "Daily",
  });
  for (let index = 0; index < Daily_PrimaryTask.length; index++) {
    const element = Daily_PrimaryTask[index];
    let ID;
    await Task.create({
      ID: uuidv4(),
      Short_description: req.body.Short_description,
      Summary: req.body.Summary,
      Priority: req.body.Priority,
      start_date_time: Date,
      end_date_time: Date,
      Task_Recurrence: req.body.Task_Recurrence,
      Assign_to_User: req.body.Assign_to_User,
      Assign_to_Department: req.body.Assign_to_Department,
      Escalated_to_User: req.body.Escalated_to_User,
      Escalated_to_Department: req.body.Escalated_to_Department,
      Email_Notify: req.body.Email_Notify,
      SMS_Notifiy: req.body.Email_SMS,
      end_time: EndTime,
      start_time: startTime,
      Monday: req.body.Monday,
      Thuesday: req.body.Thuesday,
      Wednesday: req.body.Wednesday,
      Thudesday: req.body.Thudesday,
      Friday: req.body.Friday,
      Saturday: req.body.Saturday,
      Sunday: req.body.Sunday,
      Task_Date: req.body.Date,
    });
    // for (let index = 0; index < Daily_PrimaryTask.length; index++) {
    //   Daily_PriamryTask_Auth[index] = await PrimaryTaskAuth.findOne({
    //     Task_ID: Daily_PrimaryTask[index].ID,
    //   });
    // }
  }
  console.log(Daily_PriamryTask_Auth);
};

Create();

// cron("0 0 0 * * *", function () {
//will run every day at 12:00 AM
// });
