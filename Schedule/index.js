var cron = require("node-cron");
const express = require("express");
const Mongoose = require("mongoose");
const TaskAuth = require("../Model/TaskAuth");
const Task = require("../Model/Tasks");
const PrimaryTask = require("../Model/PrimaryTasks");
const PrimaryTaskAuth = require("../Model/PrimaryTaskAuth");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

function MomentDate() {
  let date = new Date();
  let Dates = moment(date).format("YYYY-MM-DD");
  return Dates;
}

Mongoose.connect("mongodb://127.0.0.1:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then((res) => console.log(`DB CONNECTED`))
  .catch((err) => console.log(`ERROR : ${err}`));

// const Daily = async () => {
//   const Daily_PrimaryTask = await PrimaryTask.find({
//     Task_Recurrence: "Daily",
//   });
//   // Daily_PrimaryTask.length
//   for (let index = 0; index < Daily_PrimaryTask.length; index++) {
//     const element = Daily_PrimaryTask[index];
//     let IDs = uuidv4();
//     await Task.create({
//       ID: IDs,
//       Short_description: element.Short_description,
//       Summary: element.Summary,
//       Priority: element.Priority,
//       start_date_time: MomentDate(),
//       end_date_time: MomentDate(),
//       Task_Recurrence: element.Task_Recurrence,
//       Assign_to_User: element.Assign_to_User,
//       Assign_to_Department: element.Assign_to_Department,
//       Escalated_to_User: element.Escalated_to_User,
//       Escalated_to_Department: element.Escalated_to_Department,
//       Email_Notify: element.Email_Notify,
//       SMS_Notifiy: element.Email_SMS,
//       end_time: element.end_time,
//       start_time: element.start_time,
//       Monday: element.Monday,
//       Thuesday: element.Thuesday,
//       Wednesday: element.Wednesday,
//       Thudesday: element.Thudesday,
//       Friday: element.Friday,
//       Saturday: element.Saturday,
//       Sunday: element.Sunday,
//       Task_Date: MomentDate(),
//     });
//     // Daily_PrimaryTask.length
//     let PrimaryTaskauths = [];
//     PrimaryTaskauths = await PrimaryTaskAuth.find({
//       Task_ID: element.ID,
//     });
//     // console.log(PrimaryTaskauths);
//     for (let index1 = 0; index1 < PrimaryTaskauths.length; index1++) {
//       await TaskAuth.create({
//         ID: uuidv4(),
//         Task_ID: IDs,
//         Type: PrimaryTaskauths[index1].Type,
//         MinValue: PrimaryTaskauths[index1].MinValue,
//         MaxValue: PrimaryTaskauths[index1].MaxValue,
//         ExptectedValue: PrimaryTaskauths[index1].ExptectedValue,
//         Questions: PrimaryTaskauths[index1].Questions,
//         User: PrimaryTaskauths[index1].Assign_to_User,
//         Department: PrimaryTaskauths[index1].Assign_to_Department,
//         Date: MomentDate(),
//         EsUser: PrimaryTaskauths[index1].Escalated_to_User,
//         EsDepartment: PrimaryTaskauths[index1].Escalated_to_Department,
//         Approve_By: PrimaryTaskauths[index1].Approve_By,
//       });
//     }
//   }
//   console.log("Data Inserted Daily");
// };
// const Monday = async () => {
//   const Daily_PrimaryTask = await PrimaryTask.find({
//     Task_Recurrence: "Weekly",
//     Monday: true,
//   });
//   // Daily_PrimaryTask.length
//   for (let index = 0; index < Daily_PrimaryTask.length; index++) {
//     const element = Daily_PrimaryTask[index];
//     let IDs = uuidv4();
//     await Task.create({
//       ID: IDs,
//       Short_description: element.Short_description,
//       Summary: element.Summary,
//       Priority: element.Priority,
//       start_date_time: MomentDate(),
//       end_date_time: MomentDate(),
//       Task_Recurrence: element.Task_Recurrence,
//       Assign_to_User: element.Assign_to_User,
//       Assign_to_Department: element.Assign_to_Department,
//       Escalated_to_User: element.Escalated_to_User,
//       Escalated_to_Department: element.Escalated_to_Department,
//       Email_Notify: element.Email_Notify,
//       SMS_Notifiy: element.Email_SMS,
//       end_time: element.end_time,
//       start_time: element.start_time,
//       Monday: element.Monday,
//       Thuesday: element.Thuesday,
//       Wednesday: element.Wednesday,
//       Thudesday: element.Thudesday,
//       Friday: element.Friday,
//       Saturday: element.Saturday,
//       Sunday: element.Sunday,
//       Task_Date: MomentDate(),
//     });
//     // Daily_PrimaryTask.length
//     let PrimaryTaskauths = [];
//     PrimaryTaskauths = await PrimaryTaskAuth.find({
//       Task_ID: element.ID,
//     });
//     for (let index1 = 0; index1 < PrimaryTaskauths.length; index1++) {
//       await TaskAuth.create({
//         ID: uuidv4(),
//         Task_ID: IDs,
//         Type: PrimaryTaskauths[index1].Type,
//         MinValue: PrimaryTaskauths[index1].MinValue,
//         MaxValue: PrimaryTaskauths[index1].MaxValue,
//         ExptectedValue: PrimaryTaskauths[index1].ExptectedValue,
//         Questions: PrimaryTaskauths[index1].Questions,
//         User: PrimaryTaskauths[index1].Assign_to_User,
//         Department: PrimaryTaskauths[index1].Assign_to_Department,
//         Date: MomentDate(),
//         EsUser: PrimaryTaskauths[index1].Escalated_to_User,
//         EsDepartment: PrimaryTaskauths[index1].Escalated_to_Department,
//         Approve_By: PrimaryTaskauths[index1].Approve_By,
//       });
//     }
//   }
//   console.log("Data Inserted Monday");
// };

const Tuesday = async () => {
  const Daily_PrimaryTask = await PrimaryTask.find({
    Task_Recurrence: "Weekly",
    Thuesday: true,
  });
  console.log(Daily_PrimaryTask)
  // Daily_PrimaryTask.length
  // for (let index = 0; index < Daily_PrimaryTask.length; index++) {
  //   const element = Daily_PrimaryTask[index];
  //   let IDs = uuidv4();
  //   await Task.create({
  //     ID: IDs,
  //     Short_description: element.Short_description,
  //     Summary: element.Summary,
  //     Priority: element.Priority,
  //     start_date_time: MomentDate(),
  //     end_date_time: MomentDate(),
  //     Task_Recurrence: element.Task_Recurrence,
  //     Assign_to_User: element.Assign_to_User,
  //     Assign_to_Department: element.Assign_to_Department,
  //     Escalated_to_User: element.Escalated_to_User,
  //     Escalated_to_Department: element.Escalated_to_Department,
  //     Email_Notify: element.Email_Notify,
  //     SMS_Notifiy: element.Email_SMS,
  //     end_time: element.end_time,
  //     start_time: element.start_time,
  //     Monday: element.Monday,
  //     Thuesday: element.Thuesday,
  //     Wednesday: element.Wednesday,
  //     Thudesday: element.Thudesday,
  //     Friday: element.Friday,
  //     Saturday: element.Saturday,
  //     Sunday: element.Sunday,
  //     Task_Date: MomentDate(),
  //   });
  //   // Daily_PrimaryTask.length
  //   let PrimaryTaskauths = [];
  //   PrimaryTaskauths = await PrimaryTaskAuth.find({
  //     Task_ID: element.ID,
  //   });
  //   for (let index1 = 0; index1 < PrimaryTaskauths.length; index1++) {
  //     await TaskAuth.create({
  //       ID: uuidv4(),
  //       Task_ID: IDs,
  //       Type: PrimaryTaskauths[index1].Type,
  //       MinValue: PrimaryTaskauths[index1].MinValue,
  //       MaxValue: PrimaryTaskauths[index1].MaxValue,
  //       ExptectedValue: PrimaryTaskauths[index1].ExptectedValue,
  //       Questions: PrimaryTaskauths[index1].Questions,
  //       User: PrimaryTaskauths[index1].Assign_to_User,
  //       Department: PrimaryTaskauths[index1].Assign_to_Department,
  //       Date: MomentDate(),
  //       EsUser: PrimaryTaskauths[index1].Escalated_to_User,
  //       EsDepartment: PrimaryTaskauths[index1].Escalated_to_Department,
  //       Approve_By: PrimaryTaskauths[index1].Approve_By,
  //     });
  //   }
  // }
  console.log("Data Inserted Tuesday");
};
// const Wednesday = async () => {
//   const Daily_PrimaryTask = await PrimaryTask.find({
//     Task_Recurrence: "Weekly",
//     Wednesday: true,
//   });
//   // Daily_PrimaryTask.length
//   for (let index = 0; index < Daily_PrimaryTask.length; index++) {
//     const element = Daily_PrimaryTask[index];
//     let IDs = uuidv4();
//     await Task.create({
//       ID: IDs,
//       Short_description: element.Short_description,
//       Summary: element.Summary,
//       Priority: element.Priority,
//       start_date_time: MomentDate(),
//       end_date_time: MomentDate(),
//       Task_Recurrence: element.Task_Recurrence,
//       Assign_to_User: element.Assign_to_User,
//       Assign_to_Department: element.Assign_to_Department,
//       Escalated_to_User: element.Escalated_to_User,
//       Escalated_to_Department: element.Escalated_to_Department,
//       Email_Notify: element.Email_Notify,
//       SMS_Notifiy: element.Email_SMS,
//       end_time: element.end_time,
//       start_time: element.start_time,
//       Monday: element.Monday,
//       Thuesday: element.Thuesday,
//       Wednesday: element.Wednesday,
//       Thudesday: element.Thudesday,
//       Friday: element.Friday,
//       Saturday: element.Saturday,
//       Sunday: element.Sunday,
//       Task_Date: MomentDate(),
//     });
//     // Daily_PrimaryTask.length
//     let PrimaryTaskauths = [];
//     PrimaryTaskauths = await PrimaryTaskAuth.find({
//       Task_ID: element.ID,
//     });
//     for (let index1 = 0; index1 < PrimaryTaskauths.length; index1++) {
//       await TaskAuth.create({
//         ID: uuidv4(),
//         Task_ID: IDs,
//         Type: PrimaryTaskauths[index1].Type,
//         MinValue: PrimaryTaskauths[index1].MinValue,
//         MaxValue: PrimaryTaskauths[index1].MaxValue,
//         ExptectedValue: PrimaryTaskauths[index1].ExptectedValue,
//         Questions: PrimaryTaskauths[index1].Questions,
//         User: PrimaryTaskauths[index1].Assign_to_User,
//         Department: PrimaryTaskauths[index1].Assign_to_Department,
//         Date: MomentDate(),
//         EsUser: PrimaryTaskauths[index1].Escalated_to_User,
//         EsDepartment: PrimaryTaskauths[index1].Escalated_to_Department,
//         Approve_By: PrimaryTaskauths[index1].Approve_By,
//       });
//     }
//   }
//   console.log("Data Inserted Wednesday");
// };
// const Thursday = async () => {
//   const Daily_PrimaryTask = await PrimaryTask.find({
//     Task_Recurrence: "Weekly",
//     Thudesday: true,
//   });
//   // Daily_PrimaryTask.length
//   for (let index = 0; index < Daily_PrimaryTask.length; index++) {
//     const element = Daily_PrimaryTask[index];
//     let IDs = uuidv4();
//     await Task.create({
//       ID: IDs,
//       Short_description: element.Short_description,
//       Summary: element.Summary,
//       Priority: element.Priority,
//       start_date_time: MomentDate(),
//       end_date_time: MomentDate(),
//       Task_Recurrence: element.Task_Recurrence,
//       Assign_to_User: element.Assign_to_User,
//       Assign_to_Department: element.Assign_to_Department,
//       Escalated_to_User: element.Escalated_to_User,
//       Escalated_to_Department: element.Escalated_to_Department,
//       Email_Notify: element.Email_Notify,
//       SMS_Notifiy: element.Email_SMS,
//       end_time: element.end_time,
//       start_time: element.start_time,
//       Monday: element.Monday,
//       Thuesday: element.Thuesday,
//       Wednesday: element.Wednesday,
//       Thudesday: element.Thudesday,
//       Friday: element.Friday,
//       Saturday: element.Saturday,
//       Sunday: element.Sunday,
//       Task_Date: MomentDate(),
//     });
//     // Daily_PrimaryTask.length
//     let PrimaryTaskauths = [];
//     PrimaryTaskauths = await PrimaryTaskAuth.find({
//       Task_ID: element.ID,
//     });
//     for (let index1 = 0; index1 < PrimaryTaskauths.length; index1++) {
//       await TaskAuth.create({
//         ID: uuidv4(),
//         Task_ID: IDs,
//         Type: PrimaryTaskauths[index1].Type,
//         MinValue: PrimaryTaskauths[index1].MinValue,
//         MaxValue: PrimaryTaskauths[index1].MaxValue,
//         ExptectedValue: PrimaryTaskauths[index1].ExptectedValue,
//         Questions: PrimaryTaskauths[index1].Questions,
//         User: PrimaryTaskauths[index1].Assign_to_User,
//         Department: PrimaryTaskauths[index1].Assign_to_Department,
//         Date: MomentDate(),
//         EsUser: PrimaryTaskauths[index1].Escalated_to_User,
//         EsDepartment: PrimaryTaskauths[index1].Escalated_to_Department,
//         Approve_By: PrimaryTaskauths[index1].Approve_By,
//       });
//     }
//   }
//   console.log("Data Inserted Thursday");
// };
// const Friday = async () => {
//   const Daily_PrimaryTask = await PrimaryTask.find({
//     Task_Recurrence: "Weekly",
//     Friday: true,
//   });
//   // Daily_PrimaryTask.length
//   for (let index = 0; index < Daily_PrimaryTask.length; index++) {
//     const element = Daily_PrimaryTask[index];
//     let IDs = uuidv4();
//     await Task.create({
//       ID: IDs,
//       Short_description: element.Short_description,
//       Summary: element.Summary,
//       Priority: element.Priority,
//       start_date_time: MomentDate(),
//       end_date_time: MomentDate(),
//       Task_Recurrence: element.Task_Recurrence,
//       Assign_to_User: element.Assign_to_User,
//       Assign_to_Department: element.Assign_to_Department,
//       Escalated_to_User: element.Escalated_to_User,
//       Escalated_to_Department: element.Escalated_to_Department,
//       Email_Notify: element.Email_Notify,
//       SMS_Notifiy: element.Email_SMS,
//       end_time: element.end_time,
//       start_time: element.start_time,
//       Monday: element.Monday,
//       Thuesday: element.Thuesday,
//       Wednesday: element.Wednesday,
//       Thudesday: element.Thudesday,
//       Friday: element.Friday,
//       Saturday: element.Saturday,
//       Sunday: element.Sunday,
//       Task_Date: MomentDate(),
//     });
//     // Daily_PrimaryTask.length
//     let PrimaryTaskauths = [];
//     PrimaryTaskauths = await PrimaryTaskAuth.find({
//       Task_ID: element.ID,
//     });
//     for (let index1 = 0; index1 < PrimaryTaskauths.length; index1++) {
//       await TaskAuth.create({
//         ID: uuidv4(),
//         Task_ID: IDs,
//         Type: PrimaryTaskauths[index1].Type,
//         MinValue: PrimaryTaskauths[index1].MinValue,
//         MaxValue: PrimaryTaskauths[index1].MaxValue,
//         ExptectedValue: PrimaryTaskauths[index1].ExptectedValue,
//         Questions: PrimaryTaskauths[index1].Questions,
//         User: PrimaryTaskauths[index1].Assign_to_User,
//         Department: PrimaryTaskauths[index1].Assign_to_Department,
//         Date: MomentDate(),
//         EsUser: PrimaryTaskauths[index1].Escalated_to_User,
//         EsDepartment: PrimaryTaskauths[index1].Escalated_to_Department,
//         Approve_By: PrimaryTaskauths[index1].Approve_By,
//       });
//     }
//   }
//   console.log("Data Inserted Friday");
// };

// Daily();
// // Monday();
// Tuesday();
// // Wednesday();
// // Thursday();
// // Friday();

// // run every Day 2AM
// cron.schedule("0 0 2 * * *", function () {
//   Daily();
// });

// // run every Monday 2AM
// cron.schedule("0 0 2 * * 1", function () {
//   Monday();
// });

// // run every Tuesday 2AM
// cron.schedule("0 0 2 * * 2", function () {
//   Tuesday();
// });

// // run every Wednesday 2AM
// cron.schedule("0 0 2 * * 3", function () {
//   Wednesday();
// });

// // run every Thursday 2AM
// cron.schedule("0 0 2 * * 4", function () {
//   Thursday();
// });

// // run every Friday 2AM
// cron.schedule("0 0 2 * * 5", function () {
//   Friday();
// });
Tuesday();