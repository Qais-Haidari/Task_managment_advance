var cron = require("node-cron");
const express = require("express");
const TaskAuth = require("../Model/TaskAuth");
const Task = require("../Model/Tasks");
const PrimaryTask = require("../Model/PrimaryTasks");
const PrimaryTaskAuth = require("../Model/PrimaryTaskAuth");

const Create = () async =>  {
  const Daily_Task = await Task.find({ Task_Recurrence: "Daily" });
};

// cron("0 0 0 * * *", function () {
//will run every day at 12:00 AM
// });
