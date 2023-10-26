const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");
const User = require("../Model/User");
const Department = require("../Model/Department");
const Task = require("../Model/Tasks");
const PrimaryTask = require("../Model/PrimaryTasks");
const PrimaryTaskAuth = require("../Model/PrimaryTaskAuth");
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
    DepartmentsAdmin: req.body.DepartmentsAdmin,
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

Router.post("/UpdateDepartment/:id", (req, res) => {
  Department.findOneAndUpdate(
    {
      ID: req.params.id,
    },
    {
      Department_Name: req.body.Department_Name,
      Email: req.body.Email,
      Start_of_Business: req.body.Start_of_business,
      End_of_Business: req.body.End_of_business,
    }
  )
    .then((r) => res.send(r))
    .catch((err) => err);
});

// create Task
Router.post("/createTask", async (req, res) => {
  if (req.body.OnceOFF == false) {
    
  } else {
  }
  
});

Router.post("/Priamry/createTask", (req, res) => {
  const PrimaryTaskAuths = new PrimaryTaskAuth({
    ID: uuidv4(),
    Task_ID: req.body.Task_ID,
    Type: req.body.Type,
    MinValue: req.body.MinValue,
    MaxValue: req.body.MaxValue,
    ExptectedValue: req.body.ExptectedValue,
    Questions: req.body.Questions,
    User: req.body.Assign_to_User,
    Date: req.body.Date,
    Department: req.body.Assign_to_Department,
    EsUser: req.body.Escalated_to_User,
    EsDepartment: req.body.Escalated_to_Department,
  });
  PrimaryTaskAuths.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Task Auth Successfully Created");
      res.send(result);
    }
  });
});
Router.post("/TaskAuth/createTask", (req, res) => {
  const TaskAuths = new TaskAuth({
    ID: uuidv4(),
    Task_ID: req.body.Task_ID,
    Type: req.body.Type,
    MinValue: req.body.MinValue,
    MaxValue: req.body.MaxValue,
    ExptectedValue: req.body.ExptectedValue,
    Questions: req.body.Questions,
    User: req.body.Assign_to_User,
    Date: req.body.Date,
    Department: req.body.Assign_to_Department,
    EsUser: req.body.Escalated_to_User,
    EsDepartment: req.body.Escalated_to_Department,
    ApproveBy: req.body.ApproveBy,
  });
  TaskAuths.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Task Auth Successfully Created");
      res.send(result);
    }
  });
});

module.exports = Router;
