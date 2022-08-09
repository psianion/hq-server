const router = require("express").Router();

router.get("/", function (req, res, next) {
  if (req.user) {
    res.json("API is working properly");
  } else {
    res.json("bro, login no?");
  }
});

module.exports = router;
