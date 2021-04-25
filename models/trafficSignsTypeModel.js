var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var trafficSignsTypeSchema = new Schema({
	'title' : String
});

module.exports = mongoose.model('trafficSignsType', trafficSignsTypeSchema);
