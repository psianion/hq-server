const mongoose = require("mongoose");

const frontierSchema = mongoose.Schema({
  team: mongoose.SchemaTypes.String,
  groupWins: {
    type: mongoose.SchemaTypes.Number,
    default: 0,
  },
  groupMatches: {
    type: mongoose.SchemaTypes.Number,
    default: 0,
  },
  knockoutWins: {
    type: mongoose.SchemaTypes.Number,
    default: 0,
  },
  knockoutMatches: {
    type: mongoose.SchemaTypes.Number,
    default: 0,
  },
  logo: mongoose.SchemaTypes.String,
  players: {
    player1: mongoose.SchemaTypes.String,
    player2: mongoose.SchemaTypes.String,
    player3: mongoose.SchemaTypes.String,
    player4: mongoose.SchemaTypes.String,
    player5: mongoose.SchemaTypes.String,
    player6: mongoose.SchemaTypes.String,
  },
});

module.exports = mongoose.model("Frontier", frontierSchema);
