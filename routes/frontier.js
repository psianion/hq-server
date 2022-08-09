const router = require("express").Router();
const User = require("../models/user");
const Frontier = require("../models/frontier");

router.get("/", async (req, res) => {
  Frontier.find().exec(function (err, model) {
    res.json(model);
  });
});

router.post("/create", async (req, res) => {
  const { id, data } = req.body;

  try {
    const newTeam = await Frontier.create({
      team: data.frontierTeam,
      players: {
        player1: id,
      },
    });
    await newTeam.save();
    User.findOne(
      {
        _id: id,
      },
      (err, info) => {
        if (err) {
          console.log(err);
        } else {
          info.game.pokemongo.bf.s6.team = data.frontierTeam;
          info.game.pokemongo.bf.s6.invite = undefined;
          info.game.pokemongo.bf.s6.isCaptain = true;
          info.save().catch((err) => console.log(err));
        }
      }
    );
    return res.json({
      success: true,
      message: "Team Created! Invite Players!",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
