const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieSession = require("cookie-session");
const session = require("express-session");
const passport = require("passport");
const test = require("./routes/test");
const auth = require("./routes/auth");
const profile = require("./routes/profile");
const discordOAuth = require("./services/discordOAuth");

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
  /*
allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Access-Control-Request-Headers",
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Credentials",
    "Access-Control-Allow-Origin",
    "Origin",
    "Accept",
    "Access-Control-Request-Method",
  ],
*/
  credentials: true,
  preflightContinue: false,
};

const app = express();
app.use(cors(corsOptions)); //Cross-Origin Resource Sharing
app.use(express.json());
app.set("trust proxy", 1); // trust first proxy

{
  /*
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SESSION_KEY],
    sameSite: "none",
    secure: true,
  })
);

*/
}

app.use(
  session({
    secret: [process.env.COOKIE_SESSION_KEY],
    cookie: {
      maxAge: 60000 * 60 * 24,
      sameSite: "none",
      secure: true,
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
app.use("/profile", profile);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
