const router = require("express").Router();

function isAuthorized(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.json({
      messae: "this is nmot dashboard",
    });
  }
}

router.get("/", isAuthorized, function (req, res, next) {
  console.log(req.user);
  res.json({
    messae: "this is dashboard",
    user: req.user,
  });
});

module.exports = router;
