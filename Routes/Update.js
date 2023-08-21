const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");
const User = require("../Model/User");
const Department = require("../Model/Department");
const Task = require("../Model/Tasks");
const TaskAuth = require("../Model/TaskAuth");

// Update Task Auth Value
Router.post("/AuthUpdateValue/:id/:taskid", (req, res) => {
  TaskAuth.findOneAndUpdate(
    { ID: req.params.id, Task_ID: req.params.taskid },
    {
      Value: req.body.Value,
      isUserSubmit: "Yes",
      SubmitDate: req.body.Date,
      ActionedBy: req.body.ActionedBy,
    }
  )
    .then((r) => res.send(r))
    .catch((err) => res.send(err));
});

// Update Task Auth Yes No
Router.post("/AuthUpdateYes/:id/:taskid", (req, res) => {
  TaskAuth.findOneAndUpdate(
    { ID: req.params.id, Task_ID: req.params.taskid },
    {
      Value: req.body.Value,
      isUserSubmit: "Yes",
      SubmitDate: req.body.Date,
      ActionedBy: req.body.ActionedBy,
    }
  )
    .then((r) => res.send(r))
    .catch((err) => res.send(err));
});

// Reject Task and add Feedback
Router.post("/AuthUpdateFeedback/:id", (req, res) => {
  TaskAuth.findOneAndUpdate(
    { ID: req.params.id },
    {
      feedback: req.body.feeback,
      isUserSubmit: "NO",
      SubmitDate: req.body.Date,
    }
  )
    .then((r) => res.send(r))
    .catch((err) => res.send(err));
});

// Approve Task
Router.post("/AuthUpdateApprove/:id/:taskid", async (req, res) => {
  const count = await TaskAuth.find({
    isAdminApproved: "NO",
  }).countDocuments();
  if (count === 1) {
    await Task.findOneAndUpdate(
      { ID: req.params.taskid },
      { is_task_done: true }
    );
  }
  TaskAuth.findOneAndUpdate(
    { ID: req.params.id },
    {
      isUserSubmit: "Yes",
      isAdminApproved: "Yes",
    }
  )
    .then((r) => res.send(r))
    .catch((err) => res.send(err));
});

Router.post("/BuldUpdate", async (req, res) => {
  let IDs = req.body.IDs.join("").split("");
  for (let index = 0; index < IDs.length; index++) {
    let Data = await Task.findOne({ ID: IDs[index] });
    Task.findOneAndUpdate(
      { ID: IDs[index] },
      {
        Short_description:
          req.body.Short_description !== ""
            ? req.body.Short_description
            : Data.Short_description,
        Summary: req.body.Summary !== "" ? req.body.Summary : Data.Summary,
        Priority: req.body.Priority !== "" ? req.body.Priority : Data.Priority,
        start_date_time:
          req.body.start_date_time !== ""
            ? req.body.start_date_time
            : Data.start_date_time,
        end_date_time:
          req.body.end_date_time !== ""
            ? req.body.end_date_time
            : Data.end_date_time,
        Tast_duration:
          req.body.Tast_duration !== ""
            ? req.body.Tast_duration
            : Data.Tast_duration,
        Task_Recurrence:
          req.body.Task_Recurrence !== ""
            ? req.body.Task_Recurrence
            : Data.Task_Recurrence,
        Assign_to_User:
          req.body.Assign_to_User !== ""
            ? req.body.Assign_to_User
            : Data.Assign_to_User,
        Assign_to_Department:
          req.body.Assign_to_Department !== ""
            ? req.body.Assign_to_Department
            : Data.Assign_to_Department,
        Escalated_to_User:
          req.body.Escalated_to_User !== ""
            ? req.body.Escalated_to_User
            : Data.Escalated_to_User,
        Escalated_to_Department:
          req.body.Escalated_to_Department !== ""
            ? req.body.Escalated_to_Department
            : Data.Escalated_to_Department,
        SMS_Notifiy:
          req.body.Email_SMS !== "" ? req.body.Email_SMS : Data.Email_SMS,
        Email_Notify:
          req.body.Email_Notify !== "" ? req.body.Email_Notify : false,
        Monday: req.body.Monday !== "" ? req.body.Monday : false,
        Thuesday: req.body.Thuesday !== "" ? req.body.Thuesday : false,
        Wednesday: req.body.Wednesday !== "" ? req.body.Wednesday : false,
        Thudesday: req.body.Thudesday !== "" ? req.body.Thudesday : false,
        Friday: req.body.Friday !== "" ? req.body.Friday : false,
        Saturday: req.body.Saturday !== "" ? req.body.Saturday : false,
        Sunday: req.body.Sunday !== "" ? req.body.Sunday : false,
      }
    )
      .then((r) => {})
      .catch((err) => res.send(err));
  }
});

// Rollover
Router.post("/rollover/:id/:time", async (req, res) => {
  const newDate = req.params.time.split(" ")[0];
  const newTime = await Task.findOne({ ID: req.params.id }).select(
    "start_date_time"
  );
  Task.findOneAndUpdate(
    {
      ID: req.params.id,
    },
    {
      is_task_rollovered: true,
      start_date_time: newDate + " " + newTime.start_date_time.split(" ")[1],
      end_date_time: newDate + " " + newTime.start_date_time.split(" ")[1],
    }
  )
    .then((r) => res.send(r))
    .catch((err) => err);
});

module.exports = Router;
