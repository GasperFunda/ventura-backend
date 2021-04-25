var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var trafficJamsSchema = new Schema({
	'title' : String,
	'location' : Array,
	'severity' : Number,
	'average_speed' : Number
});

module.exports = mongoose.model('trafficJams', trafficJamsSchema);
