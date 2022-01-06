var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var compassSchema = new Schema({
  counter: Number,
  yaw: Number,
});

module.exports = mongoose.model("compass", compassSchema);
