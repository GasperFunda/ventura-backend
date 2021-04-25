var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var trafficSignsSchema = new Schema({
	'type' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'trafficSignsType'
	},
	'value' : Number,
	'location' : Array
});

module.exports = mongoose.model('trafficSigns', trafficSignsSchema);
