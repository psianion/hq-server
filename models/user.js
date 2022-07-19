const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  discordName: mongoose.SchemaTypes.String,
  discordId: mongoose.SchemaTypes.String,
  email: mongoose.SchemaTypes.String,
  nationality: mongoose.SchemaTypes.String,
  role: {
    type: mongoose.SchemaTypes.String,
    default: "Trainer",
  },
  region: {
    type: mongoose.SchemaTypes.String,
  },
  sprites: {
    animated: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    avatar: {
      type: mongoose.SchemaTypes.Array,
      default: ["red", "leaf"],
    },
    activeAvatar: {
      type: mongoose.SchemaTypes.String,
      default: "red",
    },
    banner: {
      type: mongoose.SchemaTypes.Array,
      default: ["red", "leaf"],
    },
    activeBanner: {
      type: mongoose.SchemaTypes.String,
      default: "gyarados",
    },
  },
  game: {
    pokemongo: {
      ign: mongoose.SchemaTypes.String,
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
