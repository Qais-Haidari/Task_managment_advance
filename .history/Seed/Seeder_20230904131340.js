const fs = require("fs");
const mongoose = require("mongoose");

// Load models
const Car = require("../Schema/Car");
const Login = require("../Schema/Login");
const Request = require("../Schema/Requests");
const Command = require("../Schema/Commands");

// Connect to DB
mongoose.connect("mongodb://localhost:27017/qais", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// // Read JSON files
const Auth = JSON.parse(fs.readFileSync(`${__dirname}/Cars.json`, "utf-8"));

const AuthTask = JSON.parse(fs.readFileSync(`${__dirname}/Aut`, "utf-8"));

const requests = JSON.parse(
  fs.readFileSync(`${__dirname}/Requests.json`, "utf-8")
);

const commands = JSON.parse(
  fs.readFileSync(`${__dirname}/commands.json`, "utf-8")
);
// Import into DBs
const importData = async () => {
  try {
    await Car.create(cars);
    await Login.create(logins);
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
