var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var activitySchema = new Schema({
  title: String,
  latitude: Array,
  longtitude: Array,
  speed: Array,
  elevation: Array,
  distance: Number,
  type: String,
  start_time: Date,
  end_time: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("activity", activitySchema);
