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

module.exports = Router;
