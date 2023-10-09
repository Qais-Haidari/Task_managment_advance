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

// Delete User
Router.post("/DeleteUser/:id", (req, res) => {
  User.remove({ ID: req.params.id })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// Delete Department
Router.post("/DeleteDepartment/:id", (req, res) => {
  Department.remove({ ID: req.params.id })
    .then((r) => res.send("as"))
    .catch((err) => err);
});

// Delete Department
Router.post("/DeletePrimaryTask/:id", async (req, res) => {
  await PrimaryTask.find({ ID: req.params.id });
  PrimaryTaskAuth.find({ Task_ID: req.params.id })
  // console.log("res");
  // PrimaryTask.remove({ ID: req.params.id })
  //   .then((r) => res.send(r))
  //   .catch((err) => err);
});

module.exports = Router;