const router = require("express").Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  User.find(
    { "game.pokemongo.gbl.s12": { $exists: true } },
    {
      "game.pokemongo.gbl": 1,
      "game.pokemongo.ign": 1,
      "game.pokemongo.trainerTeam": 1,
      nationality: 1,
      "sprites.activeAvatar": 1,
    }
  )
    .sort({
      "game.pokemongo.gbl.s12.currentMMR": "descending",
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
