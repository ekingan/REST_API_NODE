var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var GymSchema = new Schema({
	name: String
});

module.exports = mongoose.model('Gym', GymSchema);
