const router = require("express").Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  User.find(
    { "game.pokemongo.gbl": { $exists: true }, nationality: "in" },
    {
      "game.pokemongo.gbl": 1,
      "game.pokemongo.ign": 1,
      "game.pokemongo.trainerTeam": 1,
      nationality: 1,
      "sprites.activeAvatar": 1,
    }
  )
    .sort({
      "game.pokemongo.gbl.s11.currentMMR": "descending",
    })
    .exec(function (err, model) {
      if (err) {
        console.log(err);
      } else {
        res.json(model);
      }
    });
});

module.exports = router;
