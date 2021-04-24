var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'username' : String,
	'first_name' : String,
	'last_name' : String,
	'email' : String,
	'password' : String,
	'date_of_birth' : Date
});

module.exports = mongoose.model('user', userSchema);
