const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");
const Users = require("../Model/User");
const Task = require("../Model/Tasks");
const Department = require("../Model/Department");
const TaskAuth = require("../Model/TaskAuth");

// GET ALL Users
Router.get("/Users", (req, res) => {
  Users.find()
    .then((r) => res.send(r))
    .catch((err) => err);
});

// GET Users by Name
Router.get("/Userslogin/:name", (req, res) => {
  Users.findOne({ First_Name: req.params.name })
    .then((r) => res.send(r))
    .catch((err) => err);
});

// GET ALL DEPARTMENTS
Router.get("/Departments", (req, res) => {
  Department.find()
    .then((r) => res.send(r))
    .catch((err) => err);
});

// GET ALL Users where status is Active
Router.get("/Users/active", (req, res) => {
  Users.find({ Status: "Active" })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// Get Task
Router.get("/task", (req, res) => {
  Task.find()
    .then((r) => res.send(r))
    .catch((err) => err);
});
// Get Task ROLLOVER
Router.get("/task/rollover", (req, res) => {
  Task.find({ is_task_rollovered: false })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// Get Task by id
Router.get("/task/:id", (req, res) => {
  Task.findOne({ ID: req.params.id })
    .then((r) => res.send(r))
    .catch((err) => err);
});

// Get Task by Name
Router.get("/tasks/:id", (req, res) => {
  Task.find({ Assign_to_User: req.params.id })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// Get Task by Name
Router.get("/tasks2/:id", (req, res) => {
  Task.find({ Assign_to_Department: req.params.id })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// Get Task by Name
Router.get("/tasks3/:id", (req, res) => {
  Task.find({ Escalated_to_User: req.params.id })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// Get Task by Name
Router.get("/tasks4/:id", (req, res) => {
  Task.find({ Escalated_to_Department: req.params.id })
    .then((r) => res.send(r))
    .catch((err) => err);
});

// Get Task Auth
Router.get("/Auth/:id", (req, res) => {
  TaskAuth.find({ Task_ID: req.params.id, isUserSubmit: "NO" })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// Get Task Auth by ID and Task ID
Router.get("/Auth/:id/:task_ID", (req, res) => {
  TaskAuth.findOne({ Task_ID: req.params.Task_ID, ID: req.params.ID })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// Get Department
Router.get("/department", (req, res) => {
  Department.find()
    .then((r) => res.send(r))
    .catch((err) => err);
});

// Get Department for department owner
Router.get("/department/owner/:id", (req, res) => {
  Task.find({ Assign_to_Department: req.params.id })
    .then((r) => res.send(r))
    .catch((err) => err);
});

// GET SERVERAL DAY REQUEST DATA
Router.get("/RDATA/:a", (req, res) => {
  if (req.params.a.split(" ")[1] !== "undefined") {
    Task.find({
      Task_Date: req.params.a.split(" ")[0].replace(/-0+/g, "-"),
    })
      .then((r) => {
        res.send(r);
      })
      .catch((err) => res.send(err));
  } else {
    Task.find({
      Task_Date: {
        $gte: req.params.a.split(" ")[0].replace(/-0+/g, "-"),
        $lt: req.params.a.split(" ")[1].replace(/-0+/g, "-"),
      },
    })
      .then((r) => {
        res.send(r);
      })
      .catch((err) => res.send(err));
  }
});

// Get Task Auth by user and isAdminApprove
Router.get("/TaskAuthApprove/:user", (req, res) => {
  TaskAuth.find({
    User: req.params.user,
    isUserSubmit: "Yes",
    isAdminApproved: "NO",
  })
    .then((r) => res.send(r))
    .catch((err) => err);
});

module.exports = Router;
