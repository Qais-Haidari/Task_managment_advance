var cron = require("node-cron");
const express = require("express");
const PrimaryTask = require("../Model/PrimaryTasks");
const Create = () => {

}


cron("0 0 0 * * *", function () {
  //will run every day at 12:00 AM
});