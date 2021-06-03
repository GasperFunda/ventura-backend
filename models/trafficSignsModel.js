var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var trafficSignsSchema = new Schema({
  type: String,
  latitude: Number,
  longtitude: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  path: String,
  image: String,
});

module.exports = mongoose.model("trafficSigns", trafficSignsSchema);
