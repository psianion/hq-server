const router = require("express").Router();
const User = require("../models/user");
const Frontier = require("../models/frontier");

router.get("/", async (req, res) => {
  Frontier.find()
    .sort({
      groupWins: "descending",
    })
    .exec(function (err, model) {
      if (err) {
        console.log(err);
      } else {
        res.json(model);
      }
    });
});

router.get("/group", async (req, res) => {
  User.find(
    {
      "game.pokemongo.bf.s6.group": `Group ${req.query.group}`,
    },
    {
      "game.pokemongo.bf.s6.groupWins": 1,
      "game.pokemongo.bf.s6.group": 1,
      "game.pokemongo.bf.s6.team": 1,
      "game.pokemongo.bf.s6.groupPokemon": 1,
      "game.pokemongo.bf.s6.groupMatches": 1,
      "game.pokemongo.ign": 1,
      "game.pokemongo.trainerTeam": 1,
      "sprites.activeAvatar": 1,
    }
  ).exec(function (err, model) {
    res.json({
      group: `Group ${req.query.group}`,
      data: model,
    });
  });
});

router.get("/qf", async (req, res) => {
  User.find(
    {
      "game.pokemongo.bf.s6.qf": `QF ${req.query.qf}`,
    },
    {
      "game.pokemongo.bf.s6.knockoutWins": 1,
      "game.pokemongo.bf.s6.qf": 1,
      "game.pokemongo.bf.s6.team": 1,
      "game.pokemongo.bf.s6.knockoutPokemon": 1,
      "game.pokemongo.bf.s6.knockoutMatches": 1,
      "game.pokemongo.ign": 1,
      "game.pokemongo.trainerTeam": 1,
      "sprites.activeAvatar": 1,
    }
  ).exec(function (err, model) {
    res.json({
      qf: `Quarter Finals ${req.query.qf}`,
      data: model,
    });
  });
});

router.get("/sf", async (req, res) => {
  User.find(
    {
      "game.pokemongo.bf.s6.sf": `SF ${req.query.sf}`,
    },
    {
      "game.pokemongo.bf.s6.knockoutWins": 1,
      "game.pokemongo.bf.s6.sf": 1,
      "game.pokemongo.bf.s6.team": 1,
      "game.pokemongo.bf.s6.knockoutPokemon": 1,
      "game.pokemongo.bf.s6.knockoutMatches": 1,
      "game.pokemongo.ign": 1,
      "game.pokemongo.trainerTeam": 1,
      "sprites.activeAvatar": 1,
    }
  ).exec(function (err, model) {
    res.json({
      qf: `Semi Finals ${req.query.sf}`,
      data: model,
    });
  });
});

router.get("/finals", async (req, res) => {
  User.find(
    {
      "game.pokemongo.bf.s6.finals": true,
    },
    {
      "game.pokemongo.bf.s6.knockoutWins": 1,
      "game.pokemongo.bf.s6.finals": 1,
      "game.pokemongo.bf.s6.team": 1,
      "game.pokemongo.bf.s6.knockoutPokemon": 1,
      "game.pokemongo.bf.s6.knockoutMatches": 1,
      "game.pokemongo.ign": 1,
      "game.pokemongo.trainerTeam": 1,
      "sprites.activeAvatar": 1,
    }
  ).exec(function (err, model) {
    res.json({
      qf: `Grand Finals`,
      data: model,
    });
  });
});

router.get("/team", async (req, res) => {
  let data = {
    teamData: {},
    players: [],
  };

  data.teamData = await (await Frontier.find({ logo: req.query.id }))[0];

  data.players = await User.find(
    {
      "game.pokemongo.bf.s6.team": data.teamData.team,
    },
    {
      "game.pokemongo.bf.s6.isCaptain": 1,
      "game.pokemongo.bf.s6.groupWins": 1,
      "game.pokemongo.bf.s6.groupPokemon": 1,
      "game.pokemongo.bf.s6.groupMatches": 1,
      "game.pokemongo.bf.s6.knockoutWins": 1,
      "game.pokemongo.bf.s6.knockoutMatches": 1,
      "game.pokemongo.ign": 1,
      "game.pokemongo.trainerTeam": 1,
      "sprites.activeAvatar": 1,
    }
  );

  res.json(data);
});

router.get("/team", async (req, res) => {
  let data = {
    teamData: {},
    players: [],
    invitedPlayers: [],
  };

  data.teamData = await (await Frontier.find({ team: req.query.team }))[0];

  data.players = await User.find(
    {
      "game.pokemongo.bf.s6.team": data.teamData.team,
    },
    {
      "game.pokemongo.bf.s6.isCaptain": 1,
      "game.pokemongo.bf.s6.groupWins": 1,
      "game.pokemongo.bf.s6.groupMatches": 1,
      "game.pokemongo.bf.s6.knockoutWins": 1,
      "game.pokemongo.bf.s6.knockoutMatches": 1,
      "game.pokemongo.ign": 1,
      "game.pokemongo.trainerTeam": 1,
      "sprites.activeAvatar": 1,
    }
  );

  data.invitedPlayers = await User.find(
    {
      "game.pokemongo.bf.s6.invite": data.teamData.team,
    },
    {
      "game.pokemongo.bf.s6.isCaptain": 1,
      "game.pokemongo.bf.s6.groupWins": 1,
      "game.pokemongo.bf.s6.groupMatches": 1,
      "game.pokemongo.bf.s6.knockoutWins": 1,
      "game.pokemongo.bf.s6.knockoutMatches": 1,
      "game.pokemongo.ign": 1,
      "game.pokemongo.trainerTeam": 1,
      "sprites.activeAvatar": 1,
    }
  );

  res.json(data);
});

router.post("/invite", async (req, res) => {
  const { teamName, data } = req.body.teamName;

  await User.findOne({ "game.pokemongo.ign": data }, async (err, info) => {
    if (!info) {
      return res.json({
        success: false,
        message: "User not registered",
      });
    } else {
      if (info.game.pokemongo.bf.s6.team) {
        return res.json({
          success: false,
          message: "User already in a team!",
        });
      } else {
        info.game.pokemongo.bf.s6.invite = teamName;
        info.save().catch((err) => console.log(err));
        return res.json({
          success: true,
          message: "Invite Sent",
        });
      }
    }
  });
});

router.post("/invite/accept", async (req, res) => {
  const { id, data } = req.body;

  User.findOne(
    {
      _id: id,
    },
    (err, info) => {
      if (err) {
        console.log(err);
      } else {
        info.game.pokemongo.bf.s6.team = data;
        info.game.pokemongo.bf.s6.invite = undefined;
        info.game.pokemongo.bf.s6.isCaptain = false;
        info.save().catch((err) => console.log(err));
        return res.json({
          success: true,
          message: "Invite Accepted",
        });
      }
    }
  );
});

router.post("/create", async (req, res) => {
  const { id, data } = req.body;

  await Frontier.findOne({ team: data.frontierTeam }, async (err, info) => {
    if (info) {
      return res.json({
        success: false,
        message: "Team already exists!",
      });
    } else {
      try {
        const newTeam = await Frontier.create({
          team: data.frontierTeam,
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
    }
  });
});

module.exports = router;
