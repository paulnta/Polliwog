'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Question = require('../question/question.model');
var Participation = require('../participation/participation.model');

var PollSchema = new Schema({
	title					:	{ type: String, trim: true, required: true },
	creationDate 	:	{ type: Date, 	default: Date.now },
	state					:	{ type: String, default: 'drafti', enum: ['drafti', 'active', 'closed']},
	questions			:	[{ type: Schema.ObjectId, ref: 'Question' }],
	participations:	[{ type: Schema.ObjectId, ref: 'Participation' }]
});

PollSchema.pre('remove', function (next) {
	Question.find({ poll: this._id }, function (err, questions) {
		if(err) { throw err; }
		questions.forEach(function (question) { question.remove(); });
	}).exec();
	Participation.find({ poll: this._id }, function (err, participations) {
		if(err) { throw err; }
		participations.forEach(function (participation) { participation.remove(); });
	}).exec();
	next();
});

module.exports = mongoose.model('Poll', PollSchema);