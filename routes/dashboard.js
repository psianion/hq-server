const router = require("express").Router();

function isAuthorized(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/test");
  }
}

router.get("/", isAuthorized, function (req, res, next) {
  res.send("This is the dashboard");
});

module.exports = router;
