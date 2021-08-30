const router = require("express").Router();
const User = require("../models/user");

router.get("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    User.findById(req.params.id, function (err, info) {
      if (err) {
        console.log(err);
        res.json({ success: false, message: "Couldn't Find Me!" });
      } else {
        res.json({ success: true, message: "Found Me!", data: info });
      }
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
        res.json({ success: false, message: "Couldn't Set Up!" });
      } else {
        res.json({ success: true, message: "Set Up!" });
      }
    }
  );
});

module.exports = router;
