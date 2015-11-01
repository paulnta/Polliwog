'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AnswerSchema = new Schema({
	participation	:	{ type: Schema.ObjectId, ref: 'Participation', required: true },
	choice				:	{ type: Schema.ObjectId, ref: 'Choice', required: true }
});

module.exports = mongoose.model('Answer', AnswerSchema);