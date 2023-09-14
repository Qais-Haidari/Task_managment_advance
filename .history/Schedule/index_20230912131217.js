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
  // Daily_PrimaryTask.length
  for (let index = 0; index < Daily_PrimaryTask.length; index++) {
    const element = Daily_PrimaryTask[index];
    console.log(element);
    let IDs = uuidv4();
    await Task.create({
      ID: IDs,
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
    // Daily_PrimaryTask.length
    let PrimaryTaskauths = [];
    PrimaryTaskauths = await PrimaryTaskAuth.find({
      Task_ID: element.ID,
    });
    for (let index1 = 0; index1 < PrimaryTaskauths.length; index1++) {
      await TaskAuth.create({
        ID: uuidv4(),
        Task_ID: IDs,
        Type: PrimaryTaskauths[index1].Type,
        MinValue: PrimaryTaskauths[index1].MinValue,
        MaxValue: PrimaryTaskauths[index1].MaxValue,
        ExptectedValue: PrimaryTaskauths[index1].ExptectedValue,
        Questions: PrimaryTaskauths[index1].Questions,
        User: PrimaryTaskauths[index1].Assign_to_User,
        Department: PrimaryTaskauths[index1].Assign_to_Department,
        Date: MomentDate(),
        EsUser: PrimaryTaskauths[index1].Escalated_to_User,
        EsDepartment: PrimaryTaskauths[index1].Escalated_to_Department,
        ApproveBy: PrimaryTaskauths[index1].ApproveBy,
      });
    }
  }
  console.log("Data Inserted");
};
Create();

// cron("0 0 0 * * *", function () {
// will run every day at 12:00 AM
// });
