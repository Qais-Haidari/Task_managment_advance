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
const User = require("./Model/User");
const TaskAuth = require("./Model/TaskAuth");
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo');

App.use(Express.json());
App.use(Express.urlencoded({ extended: false }));
App.use(Helmet());
App.use(Cors("*"));
App.use(morgan("tiny"));
App.use(hpp());



App.use(session({
  secret: 'gameover',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongoUrl: 'mongodb://127.0.0.1:27017/dbName' })
}));


const strategy = new LocalStrategy(User.authenticate())
passport.use(strategy);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
App.use(passport.initialize());
App.use(passport.session());



// CONNECT DBs
Mongoose.connect("mongodb://127.0.0.1:27017/dbName", {
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


// ////////////////////////////////////////////////////
App.post('/register', function (req, res) {
  User.register(
    new User({ 
      email: req.body.email, 
      username: req.body.username 
    }), req.body.password, function (err, msg) {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Successful" });
      }
    }
  )
})

/*
  Login routes -- This is where we will use the 'local'
  passport authenciation strategy. If success, send to
  /login-success, if failure, send to /login-failure
*/
App.post('/login', passport.authenticate('local', { 
  failureRedirect: '/login-failure', 
  successRedirect: '/login-success'
}), (err, req, res, next) => {
  if (err) next(err);
});

App.get('/login-failure', (req, res, next) => {
  console.log(req.session);
  res.send('Login Attempt Failed.');
});

App.get('/login-success', (req, res, next) => {
  console.log(req.session);
  res.send('Login Attempt was successful.');
});

/*
  Protected Route -- Look in the account controller for
  how we ensure a user is logged in before proceeding.
  We call 'isAuthenticated' to check if the request is 
  authenticated or not. 
*/
App.get('/profile', function(req, res) {
  console.log(req.session)
  if (req.isAuthenticated()) {
    res.json({ message: 'You made it to the secured profie' })
  } else {
    res.json({ message: 'You are not authenticated' })
  }
})

// //////////////////////////////////////////////////////////












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
        Image_Hint: req.body.Hint
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
