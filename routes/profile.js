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

  const tc = data.trainerCode
    .replace(/\s/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();

  const ign = data.ign.replace(/\s/g, "");

  User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        nationality: data.nationality,
        game: {
          pokemongo: {
            ign: ign,
            trainerCode: tc,
            trainerTeam: data.trainerTeam,
          },
        },
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

router.post("/set/gbl", async (req, res) => {
  const { id, mmr } = req.body;

  const setRank = (highestMMR) => {
    if (highestMMR >= 3000) {
      return "legend";
    } else if (2750 <= highestMMR && highestMMR < 3000) {
      return "expert";
    } else if (2500 <= highestMMR && highestMMR < 2750) {
      return "veteran";
    } else if (highestMMR < 2500) {
      return "ace";
    }
  };

  User.findOne({ _id: id }, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, message: "MMR not set, server error!" });
    } else {
      if (!data.game.pokemongo.gbl.s11.currentMMR) {
        data.game.pokemongo.gbl.s11.currentMMR = mmr;
        data.game.pokemongo.gbl.s11.highestMMR = mmr;
        data.game.pokemongo.gbl.s11.rank = setRank(mmr);
        data.save().catch((err) => console.log(err));
        res.json({ success: true, message: "MMR Set success!" });
      } else {
        if (data.game.pokemongo.gbl.s11.highestMMR > mmr) {
          data.game.pokemongo.gbl.s11.currentMMR = mmr;
          data.save().catch((err) => console.log(err));
          res.json({ success: true, message: "MMR Set success!" });
        } else {
          data.game.pokemongo.gbl.s11.currentMMR = mmr;
          data.game.pokemongo.gbl.s11.highestMMR = mmr;
          data.game.pokemongo.gbl.s11.rank = setRank(mmr);
          data.save().catch((err) => console.log(err));
          res.json({ success: true, message: "MMR Set success!" });
        }
      }
    }
  });
});

module.exports = router;
