'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	poll		:	{ type: Schema.ObjectId, ref: 'Poll', required: true },
	title		:	{ type: String, trim: true, required: true },
	type		:	{ type: String, trim: true, default: '' },
	choices	:	[{ type: Schema.ObjectId, ref: 'Choice' }]
});

module.exports = mongoose.model('Question', QuestionSchema);