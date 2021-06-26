const router = require("express").Router();

function isAuthorized(req, res, next) {
  if (req.user) {
    console.log("Logged In");
    next();
  } else {
    console.log("Not Logged In");
    res.redirect("/test");
  }
}

router.get("/", isAuthorized, function (req, res, next) {
  res.send("This is the dashboard");
});

module.exports = router;
