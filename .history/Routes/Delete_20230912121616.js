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
Router.post("/DeleteUser/:id", (req, res) => {
  User.remove({ ID: req.params.id }).then;
});

module.exports = Router;
