
var mongoose = require('mongoose');

var PhoneSchema = new mongoose.Schema({
    marque : String,
    modele : String,
	prix : Number,
	image : String,
	capacite : Number,
	dim : [Number]
});

module.exports = mongoose.model("phones", PhoneSchema);