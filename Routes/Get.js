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
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const nodemailer = require("nodemailer");

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
// GET TASK ( MONITOR DASHBOARD )
Router.get("/Auth/MD/:id", (req, res) => {
  console.log(req.params.id)
  TaskAuth.find({ Task_ID: req.params.id, Approve_By: { $ne: 'No One' } })
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
    Approve_By: req.params.user,
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

// SEND EMAIL TO USERS
Router.get("/user/email/:pin/:email", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: "587",
    secureConnection: true,
    tls: { ciphers: "SSLv3" },
    auth: {
      user: "CustomerService@unifresh.com.au",
      pass: "Yourself1",
    },
  });
  var mailOptions = {
    from: "CustomerService@unifresh.com.au",
    to: `${req.params.email}`,
    subject: "Unifresh BOS Pin Code",
    text: `Pin Code: ${req.params.pin}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
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
    $or: [
      {
        Escalated_to_User: { $ne: "" },
      },
      {
        Escalated_to_Department: { $ne: "" },
      },
    ],
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
Router.get("/PrimaryTasks/TaskRecurrence/:name", (req, res) => {
  PrimaryTask.find({ Task_Recurrence: req.params.name })
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

Router.get("/task/advancedashboard/Department/:name/:user", (req, res) => {
  Task.find({
    Task_Date: req.params.name,
    Assign_to_Department: req.params.user,
  })
    .then((r) => res.send(r))
    .catch((err) => err);
});

Router.get(
  "/task/advancedashboard/EXDepartment/:name/:user/:time",
  async (req, res) => {
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
      Task_Date: req.params.name,
      Escalated_to_Department: req.params.user,
      end_time: { $lt: time_ },
    })
      .then((r) => res.send(r))
      .catch((err) => err);
  }
);

Router.get(
  "/task/advancedashboard/EXUser/:name/:user/:time",
  async (req, res) => {
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
      Task_Date: req.params.name,
      Escalated_to_User: req.params.user,
      end_time: { $lt: time_ },
    })
      .then((r) => res.send(r))
      .catch((err) => err);
  }
);



// ----------------------------------------------- >
// @ MONITOR DASHBOARD

//ESCALATED TASKS
Router.get("/task/dashboard/Monitor/:date/:time", (req, res) => {
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
    Priority: { $nin: ['Low', 'Medium'] },
    Task_Date: req.params.date,
    end_time: { $lt: time_ },
    is_task_done: false,
  })
    .then((r) => res.send(r))
    .catch((err) => err);
});

// NOT ESCALATED TASKS
Router.get("/task/dashboard/Monitor/notEST/:date/:time", (req, res) => {
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
    Task_Date: req.params.date,
    end_time: { $gt: time_ },
    is_task_done: false,
  })
    .then((r) => res.send(r))
    .catch((err) => err);
});

Router.get("/task/dashboard/Monitor/:user/:critical/:date/:time", (req, res) => {
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

  
  if (req.params.critical == 'All') {
    Task.find({
      Task_Date: req.params.date,
      end_time: { $lt: time_ },
      is_task_done: false,
      Assign_to_User: req.params.user
    })
    .then((r) => res.send(r))
    .catch((err) => err);  
  }else {
    Task.find({
      Task_Date: req.params.date,
      end_time: { $lt: time_ },
      is_task_done: false,
      Priority: req.params.critical,
      Assign_to_User: req.params.user
    })
    .then((r) => res.send(r))
    .catch((err) => err);
  }
});

// NOT ESCALATED TASKS
Router.get("/task/dashboard/Monitor/:user/:critical/notEST/:date/:time", (req, res) => {
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
    Task_Date: req.params.date,
    end_time: { $gt: time_ },
    is_task_done: false,
    Priority: req.params.critical,
    Assign_to_User: req.params.user
  })
    .then((r) => res.send(r))
    .catch((err) => err);
});


// ________________________________________________
// 2IC USERS ROUTES
// GET User by ID
Router.get("/User/2ic/:name", (req, res) => {
  Users.findOne({ First_Name: req.params.name })
    .then((r) => res.send(r))
    .catch((err) => err);
});
// ----------------------------------------------- >
// /:name/:user/:tasks

Router.post("/task/advancedasbhboard/TaskID/:name/:user", async (req, res) => {
  let filter = req.body.task.split(",");
  let Requirments = [];
  for (let index = 0; index < filter.length; index++) {
    // console.log(await TaskAuth({ Task_ID: filter[index] }));
    let a = await TaskAuth.find({ Task_ID: filter[index] });
    // console.log(a);
    Requirments.push(a);
  }
  res.send(Requirments);

  // res.send(req.params.tasks);
  // Task.find({
  //   Task_Date: req.params.name,
  //   Assign_to_User: req.params.user,
  // })
  //   .then((r) => res.send(r))
  //   .catch((err) => err);
});

// SCHEDULE -------------------------------------------------------------------------
const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: "587",
    secureConnection: true,
    tls: { ciphers: "SSLv3" },
    auth: {
      user: "customerservice@unifresh.com.au",
      pass: "ypzgnwhfgqnrzcbm",
    },
  });

function MomentDate() {
  let date = new Date();
  let Dates = moment(date).format("YYYY-MM-DD");
  return Dates;
}
Router.get("/Daily/Schedule", (req, res) => {
  const Daily = async () => {
    const Daily_PrimaryTask = await PrimaryTask.find({
      Task_Recurrence: "Daily",
    });
    // Daily_PrimaryTask.length
    for (let index = 0; index < Daily_PrimaryTask.length; index++) {
      const element = Daily_PrimaryTask[index];
      let IDs = uuidv4();
      await Task.create({
        ID: IDs,
        Short_description: element.Short_description,
        Summary: element.Summary,
        Priority: element.Priority,
        start_date_time: MomentDate(),
        end_date_time: MomentDate(),
        Task_Recurrence: element.Task_Recurrence,
        Assign_to_User: element.Assign_to_User,
        Assign_to_Department: element.Assign_to_Department,
        Escalated_to_User: element.Escalated_to_User,
        Escalated_to_Department: element.Escalated_to_Department,
        Email_Notify: element.Email_Notify,
        SMS_Notifiy: element.Email_SMS,
        end_time: element.end_time,
        start_time: element.start_time,
        Monday: element.Monday,
        Thuesday: element.Thuesday,
        Wednesday: element.Wednesday,
        Thudesday: element.Thudesday,
        Friday: element.Friday,
        Saturday: element.Saturday,
        Sunday: element.Sunday,
        Task_Date: MomentDate(),
      });
      // Daily_PrimaryTask.length
      let PrimaryTaskauths = [];
      PrimaryTaskauths = await PrimaryTaskAuth.find({
        Task_ID: element.ID,
      });
      // console.log(PrimaryTaskauths);
      for (let index1 = 0; index1 < PrimaryTaskauths.length; index1++) {
        await TaskAuth.create({
          ID: uuidv4(),
          Task_ID: IDs,
          Type: PrimaryTaskauths[index1].Type,
          MinValue: PrimaryTaskauths[index1].MinValue,
          MaxValue: PrimaryTaskauths[index1].MaxValue,
          ExptectedValue: PrimaryTaskauths[index1].ExptectedValue,
          Questions: PrimaryTaskauths[index1].Questions,
          User: PrimaryTaskauths[index1].Assign_to_User,
          Department: PrimaryTaskauths[index1].Assign_to_Department,
          Date: MomentDate(),
          EsUser: PrimaryTaskauths[index1].Escalated_to_User,
          EsDepartment: PrimaryTaskauths[index1].Escalated_to_Department,
          Approve_By: PrimaryTaskauths[index1].Approve_By,
        });
      }
    }
    console.log("Data Inserted Daily");
    res.send("Success Daily");
  };
  var mailOptions = {
    from: "customerservice@unifresh.com.au",
    to: `qais.kazimi@unifresh.com.au`,
    subject: "When Deb Is Away Direct Debits",
    text: `Daily Task Runs`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  Daily();
});

Router.get("/Monday/Schedule", (req, res) => {
  const Monday = async () => {
    const Monday_PrimaryTask = await PrimaryTask.find({
      Task_Recurrence: "Weekly",
      Monday: true,
    });
    // console.log(Monday_PrimaryTask)
    
    for (let index = 0; index < Monday_PrimaryTask.length; index++) {
      const element = Monday_PrimaryTask[index];
      if (element.Assign_to_User === 'Chad' && element.Short_description === 'Check Shorts are compeleted ') {
        console.log(element)
      }
    }
    for (let index = 0; index < Monday_PrimaryTask.length; index++) {
      const element = Monday_PrimaryTask[index];
      let IDs = uuidv4();
      await Task.create({
        ID: IDs,
        Short_description: element.Short_description,
        Summary: element.Summary,
        Priority: element.Priority,
        start_date_time: MomentDate(),
        end_date_time: MomentDate(),
        Task_Recurrence: element.Task_Recurrence,
        Assign_to_User: element.Assign_to_User,
        Assign_to_Department: element.Assign_to_Department,
        Escalated_to_User: element.Escalated_to_User,
        Escalated_to_Department: element.Escalated_to_Department,
        Email_Notify: element.Email_Notify,
        SMS_Notifiy: element.Email_SMS,
        end_time: element.end_time,
        start_time: element.start_time,
        Monday: element.Monday,
        Thuesday: element.Thuesday,
        Wednesday: element.Wednesday,
        Thudesday: element.Thudesday,
        Friday: element.Friday,
        Saturday: element.Saturday,
        Sunday: element.Sunday,
        Task_Date: MomentDate(),
      });
      let PrimaryTaskauths = [];
      PrimaryTaskauths = await PrimaryTaskAuth.find({
        Task_ID: element.ID,
      });
      for (let index1 = 0; index1 < PrimaryTaskauths.length; index1++) {
        await TaskAuth.create({
          ID: uuidv4(),
          Task_ID: IDs,
          Type: PrimaryTaskauths[index1].Type,
          MinValue: PrimaryTaskauths[index1].MinValue,
          MaxValue: PrimaryTaskauths[index1].MaxValue,
          ExptectedValue: PrimaryTaskauths[index1].ExptectedValue,
          Questions: PrimaryTaskauths[index1].Questions,
          User: PrimaryTaskauths[index1].Assign_to_User,
          Department: PrimaryTaskauths[index1].Assign_to_Department,
          Date: MomentDate(),
          EsUser: PrimaryTaskauths[index1].Escalated_to_User,
          EsDepartment: PrimaryTaskauths[index1].Escalated_to_Department,
          Approve_By: PrimaryTaskauths[index1].Approve_By,
        });
      }
    }
    console.log("Data Inserted Monday");
    res.json(Monday_PrimaryTask);
  };
  var mailOptions = {
    from: "customerservice@unifresh.com.au",
    to: `qais.kazimi@unifresh.com.au`,
    subject: "When Deb Is Away Direct Debits",
    text: `Monday Task Runs`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  Monday();
});

Router.get("/Tuesday/Schedule", (req, res) => {
  const Thuesday = async () => {
    const Daily_PrimaryTask = await PrimaryTask.find({
      Task_Recurrence: "Weekly",
      Thuesday: true,
    });
    Daily_PrimaryTask.length;
    for (let index = 0; index < Daily_PrimaryTask.length; index++) {
      const element = Daily_PrimaryTask[index];
      let IDs = uuidv4();
      await Task.create({
        ID: IDs,
        Short_description: element.Short_description,
        Summary: element.Summary,
        Priority: element.Priority,
        start_date_time: MomentDate(),
        end_date_time: MomentDate(),
        Task_Recurrence: element.Task_Recurrence,
        Assign_to_User: element.Assign_to_User,
        Assign_to_Department: element.Assign_to_Department,
        Escalated_to_User: element.Escalated_to_User,
        Escalated_to_Department: element.Escalated_to_Department,
        Email_Notify: element.Email_Notify,
        SMS_Notifiy: element.Email_SMS,
        end_time: element.end_time,
        start_time: element.start_time,
        Monday: element.Monday,
        Thuesday: element.Thuesday,
        Wednesday: element.Wednesday,
        Thudesday: element.Thudesday,
        Friday: element.Friday,
        Saturday: element.Saturday,
        Sunday: element.Sunday,
        Task_Date: MomentDate(),
      });
      // Daily_PrimaryTask.length
      let PrimaryTaskauths = [];
      PrimaryTaskauths = await PrimaryTaskAuth.find({
        Task_ID: element.ID,
      });
      for (let index1 = 0; index1 < PrimaryTaskauths.length; index1++) {
        await TaskAuth.create({
          ID: uuidv4(),
          Task_ID: IDs,
          Type: PrimaryTaskauths[index1].Type,
          MinValue: PrimaryTaskauths[index1].MinValue,
          MaxValue: PrimaryTaskauths[index1].MaxValue,
          ExptectedValue: PrimaryTaskauths[index1].ExptectedValue,
          Questions: PrimaryTaskauths[index1].Questions,
          User: PrimaryTaskauths[index1].Assign_to_User,
          Department: PrimaryTaskauths[index1].Assign_to_Department,
          Date: MomentDate(),
          EsUser: PrimaryTaskauths[index1].Escalated_to_User,
          EsDepartment: PrimaryTaskauths[index1].Escalated_to_Department,
          Approve_By: PrimaryTaskauths[index1].Approve_By,
        });
      }
    }
    console.log("Data Inserted Tuesday");
    res.send("Success Thuesday");
  };
  var mailOptions = {
    from: "customerservice@unifresh.com.au",
    to: `qais.kazimi@unifresh.com.au`,
    subject: "When Deb Is Away Direct Debits",
    text: `Tuesday Task Runs`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  Thuesday();
});

Router.get("/Wednesday/Schedule", (req, res) => {
  const Wednesday = async () => {
    const Daily_PrimaryTask = await PrimaryTask.find({
      Task_Recurrence: "Weekly",
      Wednesday: true,
    });
    Daily_PrimaryTask.length;
    for (let index = 0; index < Daily_PrimaryTask.length; index++) {
      const element = Daily_PrimaryTask[index];
      let IDs = uuidv4();
      await Task.create({
        ID: IDs,
        Short_description: element.Short_description,
        Summary: element.Summary,
        Priority: element.Priority,
        start_date_time: MomentDate(),
        end_date_time: MomentDate(),
        Task_Recurrence: element.Task_Recurrence,
        Assign_to_User: element.Assign_to_User,
        Assign_to_Department: element.Assign_to_Department,
        Escalated_to_User: element.Escalated_to_User,
        Escalated_to_Department: element.Escalated_to_Department,
        Email_Notify: element.Email_Notify,
        SMS_Notifiy: element.Email_SMS,
        end_time: element.end_time,
        start_time: element.start_time,
        Monday: element.Monday,
        Thuesday: element.Thuesday,
        Wednesday: element.Wednesday,
        Thudesday: element.Thudesday,
        Friday: element.Friday,
        Saturday: element.Saturday,
        Sunday: element.Sunday,
        Task_Date: MomentDate(),
      });
      // Daily_PrimaryTask.length
      let PrimaryTaskauths = [];
      PrimaryTaskauths = await PrimaryTaskAuth.find({
        Task_ID: element.ID,
      });
      for (let index1 = 0; index1 < PrimaryTaskauths.length; index1++) {
        await TaskAuth.create({
          ID: uuidv4(),
          Task_ID: IDs,
          Type: PrimaryTaskauths[index1].Type,
          MinValue: PrimaryTaskauths[index1].MinValue,
          MaxValue: PrimaryTaskauths[index1].MaxValue,
          ExptectedValue: PrimaryTaskauths[index1].ExptectedValue,
          Questions: PrimaryTaskauths[index1].Questions,
          User: PrimaryTaskauths[index1].Assign_to_User,
          Department: PrimaryTaskauths[index1].Assign_to_Department,
          Date: MomentDate(),
          EsUser: PrimaryTaskauths[index1].Escalated_to_User,
          EsDepartment: PrimaryTaskauths[index1].Escalated_to_Department,
          Approve_By: PrimaryTaskauths[index1].Approve_By,
        });
      }
    }
    console.log("Data Inserted Wednesday");
    res.send("Success Thuesday");
  };
  var mailOptions = {
    from: "customerservice@unifresh.com.au",
    to: `qais.kazimi@unifresh.com.au`,
    subject: "When Deb Is Away Direct Debits",
    text: `Wednesday Task Runs`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  Wednesday();
});

Router.get("/Thursday/Schedule", (req, res) => {
  const Thursday = async () => {
    const Daily_PrimaryTask = await PrimaryTask.find({
      Task_Recurrence: "Weekly",
      Thudesday: true,
    });
    Daily_PrimaryTask.length;
    for (let index = 0; index < Daily_PrimaryTask.length; index++) {
      const element = Daily_PrimaryTask[index];
      let IDs = uuidv4();
      await Task.create({
        ID: IDs,
        Short_description: element.Short_description,
        Summary: element.Summary,
        Priority: element.Priority,
        start_date_time: MomentDate(),
        end_date_time: MomentDate(),
        Task_Recurrence: element.Task_Recurrence,
        Assign_to_User: element.Assign_to_User,
        Assign_to_Department: element.Assign_to_Department,
        Escalated_to_User: element.Escalated_to_User,
        Escalated_to_Department: element.Escalated_to_Department,
        Email_Notify: element.Email_Notify,
        SMS_Notifiy: element.Email_SMS,
        end_time: element.end_time,
        start_time: element.start_time,
        Monday: element.Monday,
        Thuesday: element.Thuesday,
        Wednesday: element.Wednesday,
        Thudesday: element.Thudesday,
        Friday: element.Friday,
        Saturday: element.Saturday,
        Sunday: element.Sunday,
        Task_Date: MomentDate(),
      });
      // Daily_PrimaryTask.length
      let PrimaryTaskauths = [];
      PrimaryTaskauths = await PrimaryTaskAuth.find({
        Task_ID: element.ID,
      });
      for (let index1 = 0; index1 < PrimaryTaskauths.length; index1++) {
        await TaskAuth.create({
          ID: uuidv4(),
          Task_ID: IDs,
          Type: PrimaryTaskauths[index1].Type,
          MinValue: PrimaryTaskauths[index1].MinValue,
          MaxValue: PrimaryTaskauths[index1].MaxValue,
          ExptectedValue: PrimaryTaskauths[index1].ExptectedValue,
          Questions: PrimaryTaskauths[index1].Questions,
          User: PrimaryTaskauths[index1].Assign_to_User,
          Department: PrimaryTaskauths[index1].Assign_to_Department,
          Date: MomentDate(),
          EsUser: PrimaryTaskauths[index1].Escalated_to_User,
          EsDepartment: PrimaryTaskauths[index1].Escalated_to_Department,
          Approve_By: PrimaryTaskauths[index1].Approve_By,
        });
      }
    }
    console.log("Data Inserted Thursday");
    res.send("Success Thursday");
  };
  var mailOptions = {
    from: "customerservice@unifresh.com.au",
    to: `qais.kazimi@unifresh.com.au`,
    subject: "When Deb Is Away Direct Debits",
    text: `Thursday Task Runs`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  Thursday();
});

Router.get("/Friday/Schedule", (req, res) => {
  const Friday = async () => {
    const Daily_PrimaryTask = await PrimaryTask.find({
      Task_Recurrence: "Weekly",
      Friday: true,
    });
    Daily_PrimaryTask.length;
    for (let index = 0; index < Daily_PrimaryTask.length; index++) {
      const element = Daily_PrimaryTask[index];
      let IDs = uuidv4();
      await Task.create({
        ID: IDs,
        Short_description: element.Short_description,
        Summary: element.Summary,
        Priority: element.Priority,
        start_date_time: MomentDate(),
        end_date_time: MomentDate(),
        Task_Recurrence: element.Task_Recurrence,
        Assign_to_User: element.Assign_to_User,
        Assign_to_Department: element.Assign_to_Department,
        Escalated_to_User: element.Escalated_to_User,
        Escalated_to_Department: element.Escalated_to_Department,
        Email_Notify: element.Email_Notify,
        SMS_Notifiy: element.Email_SMS,
        end_time: element.end_time,
        start_time: element.start_time,
        Monday: element.Monday,
        Thuesday: element.Thuesday,
        Wednesday: element.Wednesday,
        Thudesday: element.Thudesday,
        Friday: element.Friday,
        Saturday: element.Saturday,
        Sunday: element.Sunday,
        Task_Date: MomentDate(),
      });
      // Daily_PrimaryTask.length
      let PrimaryTaskauths = [];
      PrimaryTaskauths = await PrimaryTaskAuth.find({
        Task_ID: element.ID,
      });
      for (let index1 = 0; index1 < PrimaryTaskauths.length; index1++) {
        await TaskAuth.create({
          ID: uuidv4(),
          Task_ID: IDs,
          Type: PrimaryTaskauths[index1].Type,
          MinValue: PrimaryTaskauths[index1].MinValue,
          MaxValue: PrimaryTaskauths[index1].MaxValue,
          ExptectedValue: PrimaryTaskauths[index1].ExptectedValue,
          Questions: PrimaryTaskauths[index1].Questions,
          User: PrimaryTaskauths[index1].Assign_to_User,
          Department: PrimaryTaskauths[index1].Assign_to_Department,
          Date: MomentDate(),
          EsUser: PrimaryTaskauths[index1].Escalated_to_User,
          EsDepartment: PrimaryTaskauths[index1].Escalated_to_Department,
          Approve_By: PrimaryTaskauths[index1].Approve_By,
        });
      }
    }
    console.log("Data Inserted Friday");
    res.send("Success Friday");
  };
  var mailOptions = {
    from: "customerservice@unifresh.com.au",
    to: `qais.kazimi@unifresh.com.au`,
    subject: "When Deb Is Away Direct Debits",
    text: `Friday Task Runs`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  Friday();
});

Router.get("/Monthly/Schedule", (req, res) => {
  
  function getCurrentWeekAndDay() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentWeek = Math.ceil(currentDay / 7);
    const currentDayOfWeek = currentDate.getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return {
        week: currentWeek,
        dayOfWeek: currentDayOfWeek,
        dayName: dayNames[currentDayOfWeek]
    };
  }
  const currentInfo = getCurrentWeekAndDay();
  const Monthly = async () => {
    let Daily_PrimaryTask;
  switch (currentInfo.dayOfWeek) {
    case 1:
        Daily_PrimaryTask = await PrimaryTask.find({
          Task_Recurrence: 'Monthy',
          Task_Recurrence_Month_On: `${currentInfo.week}`,
          Monday: true
        });
        break;
    case 2:
        Daily_PrimaryTask = await PrimaryTask.find({
          Task_Recurrence: 'Monthy',
          Task_Recurrence_Month_On: `${currentInfo.week}`,
          Thuesday: true
        });
        break;
    case 3:
        Daily_PrimaryTask = await PrimaryTask.find({
          Task_Recurrence: 'Monthy',
          Task_Recurrence_Month_On: `${currentInfo.week}`,
          Wednesday: true
        });
        break;
    case 4:
        Daily_PrimaryTask = await PrimaryTask.find({
          Task_Recurrence: 'Monthy',
          Task_Recurrence_Month_On: `${currentInfo.week}`,
          Thudesday: true
        });
        break;
    case 5:
      Daily_PrimaryTask = await PrimaryTask.find({
        Task_Recurrence: 'Monthy',
        Task_Recurrence_Month_On: `${currentInfo.week}`,
        Friday: true
      });
        break;
    default:
      console.log('default')
        return 'NON'
}
    for (let index = 0; index < Daily_PrimaryTask.length; index++) {
      const element = Daily_PrimaryTask[index];
      let IDs = uuidv4();
      await Task.create({
        ID: IDs,
        Short_description: element.Short_description,
        Summary: element.Summary,
        Priority: element.Priority,
        start_date_time: MomentDate(),
        end_date_time: MomentDate(),
        Task_Recurrence: element.Task_Recurrence,
        Assign_to_User: element.Assign_to_User,
        Assign_to_Department: element.Assign_to_Department,
        Escalated_to_User: element.Escalated_to_User,
        Escalated_to_Department: element.Escalated_to_Department,
        Email_Notify: element.Email_Notify,
        SMS_Notifiy: element.Email_SMS,
        end_time: element.end_time,
        start_time: element.start_time,
        Monday: element.Monday,
        Thuesday: element.Thuesday,
        Wednesday: element.Wednesday,
        Thudesday: element.Thudesday,
        Friday: element.Friday,
        Saturday: element.Saturday,
        Sunday: element.Sunday,
        Task_Date: MomentDate(),
      });
      // Daily_PrimaryTask.length
      let PrimaryTaskauths = [];
      PrimaryTaskauths = await PrimaryTaskAuth.find({
        Task_ID: element.ID,
      });
      for (let index1 = 0; index1 < PrimaryTaskauths.length; index1++) {
        await TaskAuth.create({
          ID: uuidv4(),
          Task_ID: IDs,
          Type: PrimaryTaskauths[index1].Type,
          MinValue: PrimaryTaskauths[index1].MinValue,
          MaxValue: PrimaryTaskauths[index1].MaxValue,
          ExptectedValue: PrimaryTaskauths[index1].ExptectedValue,
          Questions: PrimaryTaskauths[index1].Questions,
          User: PrimaryTaskauths[index1].Assign_to_User,
          Department: PrimaryTaskauths[index1].Assign_to_Department,
          Date: MomentDate(),
          EsUser: PrimaryTaskauths[index1].Escalated_to_User,
          EsDepartment: PrimaryTaskauths[index1].Escalated_to_Department,
          Approve_By: PrimaryTaskauths[index1].Approve_By,
        });
      }
    }
    console.log("Data Inserted Monthy");
    res.send("Success Monthly");
  };
  Monthly();
});

// Testing Recurrence
Router.get("/Daily_test/Schedule", (req, res) => {
  const Daily_ = async () => {
    const Daily_PrimaryTask = await PrimaryTask.find({
      Task_Recurrence: "Daily",
    });
    res.json(Daily_PrimaryTask);
  }
  Daily_();
});

Router.get("/Monday_test/Schedule", (req, res) => {
  const Monday_ = async () => {
    const Monday_PrimaryTask = await PrimaryTask.find({
      Task_Recurrence: "Weekly",
      Monday: true,
    });
    res.json(Monday_PrimaryTask);
  }
  Monday_();
});

Router.get("/Tuesday_test/Schedule", (req, res) => {
  const Thuesday_ = async () => {
    const Daily_PrimaryTask = await PrimaryTask.find({
      Task_Recurrence: "Weekly",
      Thuesday: true,
    });
    res.json(Daily_PrimaryTask);
  }
  Thuesday_();
});

Router.get("/Wednesday_test/Schedule", (req, res) => {
  const Wednesday_ = async () => {
    const Daily_PrimaryTask = await PrimaryTask.find({
      Task_Recurrence: "Weekly",
      Wednesday: true,
    });
    res.json(Daily_PrimaryTask);
  }
  Wednesday_();
});

Router.get("/Thursday_test/Schedule", (req, res) => {
  const Thursday_ = async () => {
    const Daily_PrimaryTask = await PrimaryTask.find({
      Task_Recurrence: "Weekly",
      Thudesday: true,
    });
    res.json(Daily_PrimaryTask);
  };
  
  Thursday_();
});

Router.get("/Friday_test/Schedule", (req, res) => {
  const Friday_ = async () => {
    const Daily_PrimaryTask = await PrimaryTask.find({
      Task_Recurrence: "Weekly",
      Friday: true,
    });
    res.json(Daily_PrimaryTask);
  };
  Friday_();
});

Router.get("/Monthly_test/Schedule", (req, res) => {
  const Monthly = async () => {
    const Daily_PrimaryTask = await PrimaryTask.find({
      Task_Recurrence : 'Monthy',
      Task_Recurrence_Date: `${MomentDate().split('-')[2]}`
    });
    for (let index = 0; index < Daily_PrimaryTask.length; index++) {
      const element = Daily_PrimaryTask[index];
      let IDs = uuidv4();
      await Task.create({
        ID: IDs,
        Short_description: element.Short_description,
        Summary: element.Summary,
        Priority: element.Priority,
        start_date_time: MomentDate(),
        end_date_time: MomentDate(),
        Task_Recurrence: element.Task_Recurrence,
        Assign_to_User: element.Assign_to_User,
        Assign_to_Department: element.Assign_to_Department,
        Escalated_to_User: element.Escalated_to_User,
        Escalated_to_Department: element.Escalated_to_Department,
        Email_Notify: element.Email_Notify,
        SMS_Notifiy: element.Email_SMS,
        end_time: element.end_time,
        start_time: element.start_time,
        Monday: element.Monday,
        Thuesday: element.Thuesday,
        Wednesday: element.Wednesday,
        Thudesday: element.Thudesday,
        Friday: element.Friday,
        Saturday: element.Saturday,
        Sunday: element.Sunday,
        Task_Date: MomentDate(),
      });
      // Daily_PrimaryTask.length
      let PrimaryTaskauths = [];
      PrimaryTaskauths = await PrimaryTaskAuth.find({
        Task_ID: element.ID,
      });
      for (let index1 = 0; index1 < PrimaryTaskauths.length; index1++) {
        await TaskAuth.create({
          ID: uuidv4(),
          Task_ID: IDs,
          Type: PrimaryTaskauths[index1].Type,
          MinValue: PrimaryTaskauths[index1].MinValue,
          MaxValue: PrimaryTaskauths[index1].MaxValue,
          ExptectedValue: PrimaryTaskauths[index1].ExptectedValue,
          Questions: PrimaryTaskauths[index1].Questions,
          User: PrimaryTaskauths[index1].Assign_to_User,
          Department: PrimaryTaskauths[index1].Assign_to_Department,
          Date: MomentDate(),
          EsUser: PrimaryTaskauths[index1].Escalated_to_User,
          EsDepartment: PrimaryTaskauths[index1].Escalated_to_Department,
          Approve_By: PrimaryTaskauths[index1].Approve_By,
        });
      }
    }
    console.log("Data Inserted Monthy");
    res.send("Success Friday");
  };
  var mailOptions = {
    from: "customerservice@unifresh.com.au",
    to: `qais.kazimi@unifresh.com.au`,
    subject: "When Deb Is Away Direct Debits",
    text: `Friday Task Runs`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  Monthly();
});

module.exports = Router;