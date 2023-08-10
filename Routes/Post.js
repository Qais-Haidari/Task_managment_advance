const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");
const User = require("../Model/User");
const Department = require("../Model/Department");
const Task = require("../Model/Tasks");
const multer = require("multer");
const TaskAuth = require("../Model/TaskAuth");

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
  const start_date =
    req.body.start_date_time.split("")[0] +
    req.body.start_date_time.split("")[1] +
    req.body.start_date_time.split("")[2] +
    req.body.start_date_time.split("")[3] +
    req.body.start_date_time.split("")[4] +
    req.body.start_date_time.split("")[5] +
    req.body.start_date_time.split("")[6] +
    req.body.start_date_time.split("")[7] +
    req.body.start_date_time.split("")[8] +
    req.body.start_date_time.split("")[9];
  const end_date =
    req.body.end_date_time.split("")[0] +
    req.body.end_date_time.split("")[1] +
    req.body.end_date_time.split("")[2] +
    req.body.end_date_time.split("")[3] +
    req.body.end_date_time.split("")[4] +
    req.body.end_date_time.split("")[5] +
    req.body.end_date_time.split("")[6] +
    req.body.end_date_time.split("")[7] +
    req.body.end_date_time.split("")[8] +
    req.body.end_date_time.split("")[9];
  const start_time =
    req.body.start_date_time.split("")[11] +
    req.body.start_date_time.split("")[12] +
    req.body.start_date_time.split("")[13] +
    req.body.start_date_time.split("")[14] +
    req.body.start_date_time.split("")[15];
  const end_time =
    req.body.end_date_time.split("")[11] +
    req.body.end_date_time.split("")[12] +
    req.body.end_date_time.split("")[13] +
    req.body.end_date_time.split("")[14] +
    req.body.end_date_time.split("")[15];
  const task = await Task.find({ start_time: { $lt: end_time } });
  console.log(task);
  // const Assign_to_User = req.body.Assign_to_User;
  // const Assign_to_Department = req.body.Assign_to_Department;
  // const Escalated_to_User = req.body.Escalated_to_User;
  // const Escalated_to_Department = req.body.Escalated_to_Department;
  // const NewTask = new Task({
  //   ID: Math.floor(Math.random(), 1000000),
  //   Short_description: req.body.Short_description,
  //   Summary: req.body.Summary,
  //   Priority: req.body.Priority,
  //   start_date: start_date,
  //   end_date: end_date,
  //   start_time: start_time,
  //   end_time: end_time,
  //   Tast_duration: req.body.Tast_duration,
  //   Task_Recurrence: req.body.Task_Recurrence,
  //   Assign_to_User: req.body.Assign_to_User,
  //   Assign_to_Department: req.body.Assign_to_Department,
  //   Escalated_to_User: req.body.Escalated_to_User,
  //   Escalated_to_Department: req.body.Escalated_to_Department,
  //   Email_Notify: req.body.Email_Notify,
  //   SMS_Notifiy: req.body.Email_SMS,
  //   Monday: req.body.Monday,
  //   Thuesday: req.body.Thuesday,
  //   Wednesday: req.body.Wednesday,
  //   Thudesday: req.body.Thudesday,
  //   Friday: req.body.Friday,
  //   Saturday: req.body.Saturday,
  //   Sunday: req.body.Sunday,
  //   Task_Date: req.body.Date,
  // });
  // NewTask.save(function (err, result) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Task Successfully Created");
  //   }
  //   res.send("Task Successfully Created");
  // });
  // const TaskAuths = new TaskAuth({
  //   ID: Math.floor(Math.random(), 1000000),
  //   Task_ID: NewTask.ID,
  //   Type: req.body.Type,
  //   MinValue: req.body.MinValue,
  //   MaxValue: req.body.MaxValue,
  //   ExptectedValue: req.body.ExptectedValue,
  //   Questions: req.body.Questions,
  //   User: Assign_to_User,
  //   Department: Assign_to_Department,
  //   EsUser: Escalated_to_User,
  //   EsDepartment: Escalated_to_Department,
  // });
  // TaskAuths.save(function (err, result) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Task Auth Successfully Created");
  //   }
  // });
});

// Upload a file
Router.post("/upload", (req, res) => {
  console.log(req.files);
});

module.exports = Router;
