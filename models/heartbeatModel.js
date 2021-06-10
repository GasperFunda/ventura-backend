var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var heartbeatSchema = new Schema({
	'avgHeartbeat' : Number,
	'date' : Date,
	'user' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	}
});

module.exports = mongoose.model('heartbeat', heartbeatSchema);
