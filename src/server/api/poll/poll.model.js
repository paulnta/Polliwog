'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Question = require('../question/question.model');
var Participation = require('../participation/participation.model');

var PollSchema = new Schema({
	title					:	{ type: String, trim: true, required: true },
	creationDate 	:	{ type: Date, 	default: Date.now },
	state					:	{ type: String, default: 'draft', enum: ['draft', 'active', 'closed']},
	questions			:	[{ type: Schema.ObjectId, ref: 'Question' }],
	participations:	[{ type: Schema.ObjectId, ref: 'Participation' }]
});

PollSchema.pre('remove', function (next) {
	Question.remove({ poll: this._id }).exec();
	Participation.remove({ poll: this._id }).exec();
	next();
});

module.exports = mongoose.model('Poll', PollSchema);