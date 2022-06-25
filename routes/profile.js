const router = require("express").Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  if (!req.user) {
    res.json({
      success: false,
      message: "user failed to authenticate.",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "user has successfully authenticated",
      data: req.user,
    });
  }
});

router.post("/setup", async (req, res) => {
  const { id, data } = req.body;

  User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        ign: data.ign,
        trainerCode: data.trainerCode,
        trainerTeam: data.trainerTeam,
      },
    },
    { new: true },
    function (err, info) {
      if (err) {
        console.log(err);
        res.json({ success: false, message: "Setup was not successful" });
      } else {
        res.json({ success: true, message: "Set Up success!" });
      }
    }
  );
});

module.exports = router;
