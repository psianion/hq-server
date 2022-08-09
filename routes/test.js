const router = require("express").Router();

router.get("/", function (req, res, next) {
  if (req.user) {
    res.json("API is working properly ig");
  } else {
    res.json("bro, login no?");
  }
});

module.exports = router;
