const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  ign: mongoose.SchemaTypes.String,
  discordName: mongoose.SchemaTypes.String,
  discordId: mongoose.SchemaTypes.String,
  email: mongoose.SchemaTypes.String,
  nationality: mongoose.SchemaTypes.String,
  role: {
    type: mongoose.SchemaTypes.String,
    default: "TRAINER",
  },
  region: {
    type: mongoose.SchemaTypes.String,
  },
  game: {
    pokemongo: {
      trainerCode: mongoose.SchemaTypes.String,
      trainerLevel: mongoose.SchemaTypes.Number,
      trainerTeam: mongoose.SchemaTypes.String,
      homeCommunity: mongoose.SchemaTypes.String,
      gbl: {
        s11: {
          currentMMR: mongoose.SchemaTypes.Number,
          highestMMR: mongoose.SchemaTypes.Number,
          rank: mongoose.SchemaTypes.String,
        },
      },
      frontier: {
        s6: {
          teamName: mongoose.SchemaTypes.String,
        },
      },
    },
  },
});

module.exports = mongoose.model("User", userSchema);
