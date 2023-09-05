const fs = require("fs");
const mongoose = require("mongoose");

// Load models
const Car = require("../Model/Tasks");
const Login = require("../Model/");
// Connect to DB
mongoose.connect("mongodb://localhost:27017/qais", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// // Read JSON files
const Auth = JSON.parse(fs.readFileSync(`${__dirname}/Task.json`, "utf-8"));
const AuthTask = JSON.parse(fs.readFileSync(`${__dirname}/Auth.json`, "utf-8"));

// Import into DBs
const importData = async () => {
  try {
    await Car.create(Auth);
    await Login.create(AuthTask);
    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

importData();
// // Delete data
// const deleteData = async () => {
//   try {
//     await Bootcamp.deleteMany();
//     await Course.deleteMany();
//     await User.deleteMany();
//     await Review.deleteMany();
//     console.log("Data Destroyed...".red.inverse);
//     process.exit();
//   } catch (err) {
//     console.error(err);
//   }
// };

// if (process.argv[2] === "-i") {
//   importData();
// } else if (process.argv[2] === "-d") {
//   deleteData();
// }
