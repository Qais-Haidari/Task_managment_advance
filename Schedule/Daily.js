const express = require("express");
const Mongoose = require("mongoose");
const TaskAuth = require("../Model/TaskAuth");
const Task = require("../Model/Tasks");
const PrimaryTask = require("../Model/PrimaryTasks");
const PrimaryTaskAuth = require("../Model/PrimaryTaskAuth");
const { v4: uuidv4 } = require("uuid");

Mongoose.connect("mongodb://127.0.0.1:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then((res) => console.log(`DB CONNECTED`))
  .catch((err) => console.log(`ERROR : ${err}`));

const Daily = async () => {
  const Daily_PrimaryTask = await PrimaryTaskAuth.find({
    Approve_By: { $exists: false },
  });
  for (let index = 0; index < Daily_PrimaryTask.length; index++) {
    const element = Daily_PrimaryTask[index];
    PrimaryTaskAuth.updateOne({ID: element.ID} ,
      {$set: { Approve_By: "No One" }},
      {upsert: true}
   ).then(res => console.log(res)).catch(err => console.log(err))
  //  console.log(a)
  }
};

Daily()
