const Express = require("express");
const Mongoose = require("mongoose");
const Cors = require("cors");
const path = require("path");
const Helmet = require("helmet");
const App = Express();
const PORT = 5000;
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const hpp = require("hpp");
const multer = require("multer");
const Task = require("./Model/Tasks");
const TaskAuth = require("./Model/TaskAuth");
const fs = require("fs");

// localhost:5000
// localhost:5000

// MIDDLE WARES
App.use(Express.json());
App.use(Express.urlencoded({ extended: false }));
App.use(Helmet());
App.use(Cors("*"));
App.use(morgan("tiny"));
App.use(hpp());

// CONNECT DBs
Mongoose.connect("mongodb://127.0.0.1:27017tasks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then((res) => console.log(`DB CONNECTED`))
  .catch((err) => console.log(`ERROR : ${err}`));

// ADD & REGISTER ROUTES
App.use("/", require("./Routes/Get"));
App.use("/", require("./Routes/Delete"));
App.use("/", require("./Routes/Post"));
App.use("/", require("./Routes/Update"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
App.post(
  "/image/:id/:taskid/:filename/:date/:ActionedBy",
  upload.single("file"),
  function (req, res) {
    TaskAuth.findOneAndUpdate(
      { ID: req.params.id, Task_ID: req.params.taskid },
      {
        isUserSubmit: "Yes",
        Attachment: "Yes",
        Date: req.params.date,
        ActionedBy: req.params.ActionedBy,
        AttachmentPath: req.params.filename,
        SubmitDate: req.params.date,
      }
    )
      .then((r) => console.log(""))
      .catch((err) => res.send(err));
    Task.findOneAndUpdate({ ID: req.params.taskid }, { Actioned: true })
      .then((r) => {})
      .catch((err) => res.send(err));
    res.send("file uploaded");
  }
);

App.post(
  "/image/Hint/:id/:taskID",
  upload.single("file"),
  function (req, res) {
    TaskAuth.findOneAndUpdate(
      { ID: req.params.id, Task_ID: req.params.taskid },
      {
        Image_Hint: req
      }
    )
      .then((r) => console.log(""))
      .catch((err) => res.send(err));
    Task.findOneAndUpdate({ ID: req.params.taskid }, { Actioned: true })
      .then((r) => {})
      .catch((err) => res.send(err));
    res.send("file uploaded");
  }
);

// App.use(Express.static("build"));
App.use(Express.static("./images"));

// App.get("*", (req, res) =>
//   res.sendFile(path.resolve(__dirname, "./", "build", "index.html"))
// );

App.listen(PORT, console.log(`SERVER START AT ${PORT}`));
