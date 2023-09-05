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
const TaskAuth = require("./Model/TaskAuth");

// MIDDLE WARES
App.use(Express.json());
App.use(Express.urlencoded({ extended: false }));
App.use(Helmet());
App.use(Cors("*"));
App.use(morgan("tiny"));
App.use(hpp());

// CONNECT DB
Mongoose.connect("mongodb://127.0.0.1:27017tasks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then((res) => console.log(`DB CONNECTED`))
  .catch((err) => console.log(`ERROR : ${err}`));

// ADD & REGISTER ROUTES
App.use("/", require("./Routes/Get"));
// App.use("/", require("./Routes/DELETE"));
App.use("/", require("./Routes/Post"));
App.use("/", require("./Routes/Update"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./client/src/Image");
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
      .then((r) => res.send(r))
      .catch((err) => res.send(err));
  }
);

// App.use(Express.static("build"));
App.use(express.static(path.join(__dirname, "./build")));

App.get("*", (req, res) =>
  res.sendFile(
    path.resolve(__dirname, "./", "build", "index.html")
  )
);

App.listen(PORT, console.log(`SERVER START AT ${PORT}`));
