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
  origin: `${process.env.CLIENT_HOME_PAGE_URL}`, // allow to server to accept request from different origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
  preflightContinue: false,
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
