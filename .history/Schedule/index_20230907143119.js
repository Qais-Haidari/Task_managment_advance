// var cron = require("node-cron");
const express = require("express");
const Mongoose = require("mongoose");
const TaskAuth = require("../Model/TaskAuth");
const Task = require("../Model/Tasks");
const PrimaryTask = require("../Model/PrimaryTasks");
const PrimaryTaskAuth = require("../Model/PrimaryTaskAuth");
const { v4: uuidv4 } = require("uuid");

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

let Daily_PriamryTask_Auth = [];
const Create = async () => {
  const Daily_PrimaryTask = await PrimaryTask.find({
    Task_Recurrence: "Daily",
  });
  for (let index = 0; index < Daily_PrimaryTask.length; index++) {
    const element = Daily_PrimaryTask[index];
    let ID = uuidv4();
    await Task.create({
      ID: ID,
      Short_description: element.Short_description,
      Summary: element.Summary,
      Priority: element.Priority,
      start_date_time: Date,
      end_date_time: Date,
      Task_Recurrence: element.Task_Recurrence,
      Assign_to_User: element.Assign_to_User,
      Assign_to_Department: element.Assign_to_Department,
      Escalated_to_User: element.Escalated_to_User,
      Escalated_to_Department: element.Escalated_to_Department,
      Email_Notify: element.Email_Notify,
      SMS_Notifiy: element.Email_SMS,
      end_time: element.end_time,
      start_time: element.start_time,
      Monday: element.Monday,
      Thuesday: element.Thuesday,
      Wednesday: element.Wednesday,
      Thudesday: element.Thudesday,
      Friday: element.Friday,
      Saturday: element.Saturday,
      Sunday: element.Sunday,
      Task_Date: MomentDate(),
    });
    for (let index1 = 0; index1 < Daily_PrimaryTask.length; index1++) {
      Daily_PriamryTask_Auth[index] = await PrimaryTaskAuth.findOne({
        Task_ID: Daily_PrimaryTask[index].ID,
      });
      await TaskAuth.create({
        ID: uuidv4(),
        Task_ID: ID,
        Type: Daily_PriamryTask_Auth.req.body.Type,
        MinValue: Daily_PriamryTask_Auth.req.body.MinValue,
        MaxValue: Daily_PriamryTask_Auth.req.body.MaxValue,
        ExptectedValue: Daily_PriamryTask_Auth.req.body.ExptectedValue,
        Questions: Daily_PriamryTask_Auth.req.body.Questions,
        User: Daily_PriamryTask_Auth.Assign_to_User,
        Department: Daily_PriamryTask_Auth.Assign_to_Department,
        Date: Date,
        EsUser: Daily_PriamryTask_Auth.Escalated_to_User,
        EsDepartment: Daily_PriamryTask_Auth.Escalated_to_Department,
        ApproveBy: req.body.ApproveBy,
      });
    }
  }
  console.log(Daily_PriamryTask_Auth);
};

Create();

// cron("0 0 0 * * *", function () {
//will run every day at 12:00 AM
// });
