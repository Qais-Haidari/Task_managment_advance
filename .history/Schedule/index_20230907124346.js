var cron = require("node-cron");
const express = require("express");
const TaskAuth = require("../Model/TaskAuth");
const Task = require("../Model/Tasks");
const PrimaryTask = require("../Model/PrimaryTasks");
const PrimaryTaskAuth = require("../Model/PrimaryTaskAuth");

const Create = async () => {
  const Daily_Task = await PrimaryTaskTask.find({ Task_Recurrence: "Daily" });
  console.log(Daily_Task)
};

// cron("0 0 0 * * *", function () {
//will run every day at 12:00 AM
// });
