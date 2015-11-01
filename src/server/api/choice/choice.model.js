'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChoiceSchema = new Schema({
	question:	{ type: Schema.ObjectId, ref: 'Question', required: true },
	key			:	{ type: String, trim: true, required: true },
	text		:	{ type: String, trim: true, required: true },
	answers	:	[{ type: Schema.ObjectId, ref: 'Answer' }]
});

module.exports = mongoose.model('Choice', ChoiceSchema);