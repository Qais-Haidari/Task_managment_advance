const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");
const Users = require("../Model/User");
const Task = require("../Model/Tasks");
const PrimaryTask = require("../Model/PrimaryTasks");
const PrimaryTaskAuth = require("../Model/PrimaryTaskAuth");
const Department = require("../Model/Department");
const TaskAuth = require("../Model/TaskAuth");
const moment = require("moment");

// GET ALL Users
Router.get("/Users", (req, res) => {
  Users.find()
    .then((r) => res.send(r))
    .catch((err) => err);
});
// GET User by ID
Router.get("/User/one/:id", (req, res) => {
  Users.findOne({ ID: req.params.id })
    .then((r) => res.send(r))
    .catch((err) => err);
});

// GET User By Name
Router.get("/Users/:name", (req, res) => {
  Users.findOne({ First_Name: req.params.name })
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
// GET DEPARTMENT BY ID
Router.get("/Departments/:id", (req, res) => {
  Department.findOne({ ID: req.params.id })
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
Router.get("/task/:date/:time/:date2", (req, res) => {
  var time = req.params.time;
  var hours = Number(time.split(":")[0]);
  var minutes = Number(time.split(":")[1].split(" ")[0]);
  var AMPM = time.split(" ")[1];
  if (AMPM == "PM" && hours < 12) hours = hours + 12;
  if (AMPM == "AM" && hours == 12) hours = hours - 12;
  var sHours = hours.toString();
  var sMinutes = minutes.toString();
  if (hours < 10) sHours = "0" + sHours;
  if (minutes < 10) sMinutes = "0" + sMinutes;
  const time_ = sHours + ":" + sMinutes;
  Task.find({
    Assign_to_User: req.params.date,
    end_time: { $gt: time_ },
    is_task_done: false,
    Task_Date: req.params.date2,
  })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// Get Task @BULK
Router.get("/task_", (req, res) => {
  Task.find({ is_task_done: false })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// Get Task ROLLOVER
Router.get("/task/rollover/get/new/:date", async (req, res) => {
  Task.find({
    is_task_rollovered: false,
    Task_Date: { $lt: req.params.date },
  })
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
    .sort("start_time")
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
Router.get("/department/owner/:id/:date/:one", (req, res) => {
  var time = req.params.date;
  var hours = Number(time.split(":")[0]);
  var minutes = Number(time.split(":")[1].split(" ")[0]);
  var AMPM = time.split(" ")[1];
  if (AMPM == "PM" && hours < 12) hours = hours + 12;
  if (AMPM == "AM" && hours == 12) hours = hours - 12;
  var sHours = hours.toString();
  var sMinutes = minutes.toString();
  if (hours < 10) sHours = "0" + sHours;
  if (minutes < 10) sMinutes = "0" + sMinutes;
  const time_ = sHours + ":" + sMinutes;
  Task.find({
    Assign_to_Department: req.params.id,
    is_task_done: false,
    Task_Date: req.params.one,
    end_time: { $gt: time_ },
  })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// GET SERVERAL DAY REQUEST DATA
Router.get("/RDATA/:a", async (req, res) => {
  if (req.params.a.split(" ")[1] !== "undefined") {
    const FormReport = [];
    const oneDate = await Task.find({
      Task_Date: req.params.a.split(" ")[0],
    });
    for (let index = 0; index < oneDate.length; index++) {
      const element = oneDate[index];
      let data = await TaskAuth.find({
        Task_ID: element.ID,
        isAdminApproved: "Yes",
      });
      FormReport[index] = [element, { data }];
    }
    res.send(FormReport);
  } else {
    Task.find({
      Task_Date: {
        $gte: req.params.a.split(" ")[0],
        $lt: req.params.a.split(" ")[1],
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
    ApproveBy: req.params.user,
    isUserSubmit: "Yes",
    isAdminApproved: "NO",
  })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// Get Task Auth by user and isAdminApprove
Router.get("/TaskAuthApproveDepartment/:department", (req, res) => {
  TaskAuth.find({
    DepartmentsAdmin: req.params.department,
    isUserSubmit: "Yes",
    isAdminApproved: "NO",
  })
    .then((r) => res.send(r))
    .catch((err) => err);
});

// Dashboard
// Router.get("/task/dashboard/:date", (req, res) => {
Router.get("/task/dashboard/get/new/:name", (req, res) => {
  Task.find({
    Task_Date: req.params.name,
    is_task_done: false,
    Assign_to_User: { $ne: "" },
  })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// Get Task Auth by user and isAdminApprove
Router.get("/task/dashboard/complete/new/:name", (req, res) => {
  Task.find({
    // isAdminApproved: "Yes",
    // isUserSubmit: "Yes",
    Task_Date: req.params.name,
    is_task_done: true,
  })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// Get Task Auth by user and isAdminApprove
Router.get("/task/dashboard/AuthTask/new/:name", (req, res) => {
  TaskAuth.find({
    isAdminApproved: "NO",
    isUserSubmit: "Yes",
    // Date: req.params.name,
  })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// Get Task Auth by user and isAdminApprove
Router.get("/task/dashboard/Department/:date/:time", (req, res) => {
  var time = req.params.time;
  var hours = Number(time.split(":")[0]);
  var minutes = Number(time.split(":")[1].split(" ")[0]);
  var AMPM = time.split(" ")[1];
  if (AMPM == "PM" && hours < 12) hours = hours + 12;
  if (AMPM == "AM" && hours == 12) hours = hours - 12;
  var sHours = hours.toString();
  var sMinutes = minutes.toString();
  if (hours < 10) sHours = "0" + sHours;
  if (minutes < 10) sMinutes = "0" + sMinutes;
  const time_ = sHours + ":" + sMinutes;
  Task.find({
    Assign_to_Department: { $ne: "" },
    Task_Date: req.params.date,
    end_time: { $gt: time_ },
    is_task_done: false,
  })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// Get Task Auth by user and isAdminApprove
Router.get("/task/dashboard/Escalated/:date/:time", async (req, res) => {
  var time = req.params.time;
  var hours = Number(time.split(":")[0]);
  var minutes = Number(time.split(":")[1].split(" ")[0]);
  var AMPM = time.split(" ")[1];
  if (AMPM == "PM" && hours < 12) hours = hours + 12;
  if (AMPM == "AM" && hours == 12) hours = hours - 12;
  var sHours = hours.toString();
  var sMinutes = minutes.toString();
  if (hours < 10) sHours = "0" + sHours;
  if (minutes < 10) sMinutes = "0" + sMinutes;
  const time_ = sHours + ":" + sMinutes;
  Task.find({
    // $or: [
    //   {
    //     Escalated_to_User: { $ne: "" },
    //   },
    //   {
    //     Escalated_to_Department: { $ne: "" },
    //   },
    // ],
    Task_Date: req.params.date,
    end_time: { $lt: time_ },
    is_task_done: false,
  })
    .then((r) => res.send(r))
    .catch((err) => err);
});

// Get Task Auth by user and isAdminApprove
Router.get("/escalated/:date/:time/:user/:department", async (req, res) => {
  var time = req.params.time;
  var hours = Number(time.split(":")[0]);
  var minutes = Number(time.split(":")[1].split(" ")[0]);
  var AMPM = time.split(" ")[1];
  if (AMPM == "PM" && hours < 12) hours = hours + 12;
  if (AMPM == "AM" && hours == 12) hours = hours - 12;
  var sHours = hours.toString();
  var sMinutes = minutes.toString();
  if (hours < 10) sHours = "0" + sHours;
  if (minutes < 10) sMinutes = "0" + sMinutes;
  const time_ = sHours + ":" + sMinutes;
  Task.find({
    $or: [
      {
        Escalated_to_User: req.params.user,
      },
      {
        Escalated_to_Department: req.params.department,
      },
    ],
    Task_Date: req.params.date,
    end_time: { $lt: time_ },
    is_task_done: false,
  })
    .then((r) => res.send(r))
    .catch((err) => err);
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// PRIMARY TASKS
Router.get("/PrimaryTasks", (req, res) => {
  PrimaryTask.find()
    .then((r) => res.send(r))
    .catch((err) => err);
});
// PRIMARY TASKS BY Assign User
Router.get("/PrimaryTasks/user/:name", (req, res) => {
  PrimaryTask.find({ Assign_to_User: req.params.name })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// PRIMARY TASKS BY Assign Department
Router.get("/PrimaryTasks/department/:name", (req, res) => {
  PrimaryTask.find({ Assign_to_Department: req.params.name })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// PRIMARY TASKS BY Priority
Router.get("/PrimaryTasks/priority/:name", (req, res) => {
  PrimaryTask.find({ Priority: req.params.name })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// PRIMARY TASKS BY ID
Router.get("/PrimaryTasks/:id", (req, res) => {
  PrimaryTask.findOne({ ID: req.params.id })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// PRIMARY TASKS BY ID
Router.get("/PrimaryTasks/Auth/:id", (req, res) => {
  PrimaryTaskAuth.find({ Task_ID: req.params.id })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// PRIMARY TASKS BY ID
Router.get("/TaskTasks/Auth/:id", (req, res) => {
  TaskAuth.find({ Task_ID: req.params.id })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// PRIMARY TASKS BY ID
Router.get("/PrimaryTasks/Auth/one/:id", (req, res) => {
  PrimaryTaskAuth.findOne({ ID: req.params.id })
    .then((r) => res.send(r))
    .catch((err) => err);
});

// **********************************************************   ADVACNE *****************************************************************************
Router.get("/task/advancedashboard/:name", (req, res) => {
  // console.log(req.params.name);
  Task.find({
    Task_Date: req.params.name,
  })
    .then((r) => res.send(r))
    .catch((err) => err);
});

Router.get("/task/advancedashboard/User/:name/:user", (req, res) => {
  Task.find({
    Task_Date: req.params.name,
    Assign_to_User: req.params.user,
  })
    .then((r) => res.send(r))
    .catch((err) => err);
});

Router.get(
  "/task/advancedashboard/User/taskid",
  (req, res) => {
    console.log(req.params.tasks);
    // Task.find({
    //   Task_Date: req.params.name,
    //   Assign_to_User: req.params.user,
    // })
    //   .then((r) => res.send(r))
    //   .catch((err) => err);
  }
);
module.exports = Router;
