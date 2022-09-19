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
  logo: {
    type: mongoose.SchemaTypes.String,
    default: "default",
  },
});

module.exports = mongoose.model("Frontier", frontierSchema);
