const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const discordOAuth = require("./services/discordOAuth");

const test = require("./routes/test");
const auth = require("./routes/auth");
const dashboard = require("./routes/dashboard");

// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => console.log("connected to db")
);

const corsOptions = {
  origin: "http://localhost:3000", // allow to server to accept request from different origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const app = express();
app.use(cors(corsOptions)); //Cross-Origin Resource Sharing
app.use(express.json());
app.use(
  session({
    secret: "HQ",
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    resave: true,
    saveUninitialized: false,
    name: "discord.oauth2",
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/test", test);
app.use("/auth", auth);
app.use("/dashboard", dashboard);

const isAuthorized = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated",
    });
  } else {
    next();
  }
};

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get("/", isAuthorized, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("server is running..."));
