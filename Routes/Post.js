const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");
const User = require("../Model/User");
const Department = require("../Model/Department");
const Task = require("../Model/Tasks");
const multer = require("multer");
const TaskAuth = require("../Model/TaskAuth");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

// Create User
Router.post("/createUser", (req, res) => {
  const NewUser = new User({
    Status: req.body.Status,
    ID: req.body.ID,
    First_Name: req.body.First_Name,
    Last_Name: req.body.Last_Name,
    Email: req.body.Email,
    Phone: req.body.Phone,
    Start_of_business: req.body.Start_of_business,
    End_of_business: req.body.End_of_business,
    Is_Admin: req.body.Is_Admin,
    Departments: req.body.Department,
  });

  NewUser.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("user Successfully Saved");
    }
    res.send("data saved");
  });
});

// Create Department
Router.post("/createDepartment", (req, res) => {
  const NewDepartment = new Department({
    ID: req.body.ID,
    Department_ID: req.body.Department_ID,
    Department_Name: req.body.Department_Name,
    Email: req.body.Email,
    Start_of_Business: req.body.Start_of_business,
    End_of_Business: req.body.End_of_business,
  });
  NewDepartment.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Department Successfully Created");
    }
    res.send("data saved");
  });
});

Router.post("/createDepartment", (req, res) => {
  const NewDepartment = new Department({
    ID: req.body.ID,
    Department_ID: req.body.Department_ID,
    Department_Name: req.body.Department_Name,
    Email: req.body.Email,
    Start_of_Business: req.body.Start_of_business,
    End_of_Business: req.body.End_of_business,
  });
  NewDepartment.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Department Successfully Created");
    }
    res.send("data saved");
  });
});

// create Task
Router.post("/createTask", async (req, res) => {
  const start_date_time = req.body.start_date_time;
  const end_date_time = req.body.end_date_time;
  var time = req.body.start_date_time.split(" ")[1];
  var hours = Number(time.split(":")[0]);
  var minutes = Number(time.split(":")[1]);
  var AMPM = req.body.start_date_time.split(" ")[2];
  if (AMPM == "PM" && hours < 12) hours = hours + 12;
  if (AMPM == "AM" && hours == 12) hours = hours - 12;
  var sHours = hours.toString();
  var sMinutes = minutes.toString();
  if (hours < 10) sHours = "0" + sHours;
  if (minutes < 10) sMinutes = "0" + sMinutes;
  var time_ = req.body.end_date_time.split(" ")[1];
  var hours_ = Number(time_.split(":")[0]);
  var minutes_ = Number(time_.split(":")[1]);
  var AMPM_ = req.body.end_date_time.split(" ")[2];
  if (AMPM_ == "PM" && hours_ < 12) hours_ = hours_ + 12;
  if (AMPM_ == "AM" && hours_ == 12) hours_ = hours_ - 12;
  var sHours_ = hours_.toString();
  var sMinutes_ = minutes_.toString();
  if (hours_ < 10) sHours_ = "0" + sHours_;
  if (minutes_ < 10) sMinutes_ = "0" + sMinutes_;

  const start_time = sHours + ":" + sMinutes;
  const end_time = sHours_ + ":" + sMinutes_;

  const Assign_to_User = req.body.Assign_to_User;
  const Assign_to_Department = req.body.Assign_to_Department;
  const Escalated_to_User = req.body.Escalated_to_User;
  const Escalated_to_Department = req.body.Escalated_to_Department;
  if (req.body.AddTime != "0") {
    const oldtask = await Task.find({
      start_time: { $gt: start_time },
      Assign_to_User: Assign_to_User,
    });
    for (let index = 0; index < oldtask.length; index++) {
      const element = oldtask[index];
      let starttime;
      let endtime;

      switch (req.body.AddTime) {
        case "5 Min":
          starttime = moment(
            element.start_date_time.split(" ")[0] + " " + element.start_time
          )
            .add(5, "m")
            .format("DD.MM.YYYY HH:mm")
            .split(" ")[1];
          endtime = moment(
            element.end_date_time.split(" ")[0] + " " + element.start_time
          )
            .add(5, "m")
            .format("DD.MM.YYYY HH:mm")
            .split(" ")[1];
          await Task.findOneAndUpdate(
            { ID: element.ID },
            { start_time: starttime, end_time: endtime }
          );
          break;

        case "10 Min":
          starttime = moment(
            element.start_date_time.split(" ")[0] + " " + element.start_time
          )
            .add(10, "m")
            .format("DD.MM.YYYY HH:mm")
            .split(" ")[1];
          endtime = moment(
            element.end_date_time.split(" ")[0] + " " + element.start_time
          )
            .add(10, "m")
            .format("DD.MM.YYYY HH:mm")
            .split(" ")[1];
          await Task.findOneAndUpdate(
            { ID: element.ID },
            { start_time: starttime, end_time: endtime }
          );
          break;
        case "15 Min":
          starttime = moment(
            element.start_date_time.split(" ")[0] + " " + element.start_time
          )
            .add(15, "m")
            .format("DD.MM.YYYY HH:mm")
            .split(" ")[1];
          endtime = moment(
            element.end_date_time.split(" ")[0] + " " + element.start_time
          )
            .add(15, "m")
            .format("DD.MM.YYYY HH:mm")
            .split(" ")[1];
          await Task.findOneAndUpdate(
            { ID: element.ID },
            { start_time: starttime, end_time: endtime }
          );
          break;
        case "30 Min":
          starttime = moment(
            element.start_date_time.split(" ")[0] + " " + element.start_time
          )
            .add(30, "m")
            .format("DD.MM.YYYY HH:mm")
            .split(" ")[1];
          endtime = moment(
            element.end_date_time.split(" ")[0] + " " + element.start_time
          )
            .add(30, "m")
            .format("DD.MM.YYYY HH:mm")
            .split(" ")[1];
          await Task.findOneAndUpdate(
            { ID: element.ID },
            { start_time: starttime, end_time: endtime }
          );
          break;
        case "1 Hour":
          starttime = moment(
            element.start_date_time.split(" ")[0] + " " + element.start_time
          )
            .add(1, "h")
            .format("DD.MM.YYYY HH:mm")
            .split(" ")[1];
          endtime = moment(
            element.end_date_time.split(" ")[0] + " " + element.start_time
          )
            .add(1, "h")
            .format("DD.MM.YYYY HH:mm")
            .split(" ")[1];
          await Task.findOneAndUpdate(
            { ID: element.ID },
            { start_time: starttime, end_time: endtime }
          );
          break;
        case "2 Hour":
          starttime = moment(
            element.start_date_time.split(" ")[0] + " " + element.start_time
          )
            .add(2, "h")
            .format("DD.MM.YYYY HH:mm")
            .split(" ")[1];
          endtime = moment(
            element.end_date_time.split(" ")[0] + " " + element.start_time
          )
            .add(2, "h")
            .format("DD.MM.YYYY HH:mm")
            .split(" ")[1];
          await Task.findOneAndUpdate(
            { ID: element.ID },
            { start_time: starttime, end_time: endtime }
          );
          break;

        default:
          break;
      }
    }
  }
  const NewTask = new Task({
    ID: uuidv4(),
    Short_description: req.body.Short_description,
    Summary: req.body.Summary,
    Priority: req.body.Priority,
    start_date_time: start_date_time,
    end_date_time: end_date_time,
    Tast_duration: req.body.Tast_duration,
    Task_Recurrence: req.body.Task_Recurrence,
    Assign_to_User: req.body.Assign_to_User,
    Assign_to_Department: req.body.Assign_to_Department,
    Escalated_to_User: req.body.Escalated_to_User,
    Escalated_to_Department: req.body.Escalated_to_Department,
    Email_Notify: req.body.Email_Notify,
    SMS_Notifiy: req.body.Email_SMS,
    end_time: end_time,
    start_time: start_time,
    Monday: req.body.Monday,
    Thuesday: req.body.Thuesday,
    Wednesday: req.body.Wednesday,
    Thudesday: req.body.Thudesday,
    Friday: req.body.Friday,
    Saturday: req.body.Saturday,
    Sunday: req.body.Sunday,
    Task_Date: req.body.Date,
  });
  NewTask.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Task Successfully Created");
    }
    res.send("Task Successfully Created");
  });
  const TaskAuths = new TaskAuth({
    ID: uuidv4(),
    Task_ID: NewTask.ID,
    Type: req.body.Type,
    MinValue: req.body.MinValue,
    MaxValue: req.body.MaxValue,
    ExptectedValue: req.body.ExptectedValue,
    Questions: req.body.Questions,
    User: Assign_to_User,
    Department: Assign_to_Department,
    Date: start_date_time,
    EsUser: Escalated_to_User,
    EsDepartment: Escalated_to_Department,
  });
  TaskAuths.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Task Auth Successfully Created");
    }
  });
});

module.exports = Router;
