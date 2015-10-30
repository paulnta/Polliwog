'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Poll = require('../poll/poll.model');
var Choice = require('../choice/choice.model');

var QuestionSchema = new Schema({
	poll		:	{ type: Schema.ObjectId, ref: 'Poll', required: true },
	title		:	{ type: String, trim: true, required: true },
	type		:	{ type: String, trim: true, default: '' },
	choices	:	[{ type: Schema.ObjectId, ref: 'Choice' }]
});

QuestionSchema.pre('remove', function (next) {
	Poll.findByIdAndUpdate(this.poll, { $pull: { questions: this._id } }).exec();
	Choice.find({ question: this._id }, function (err, choices) {
		if(err) { throw err; }
		choices.forEach(function (choice) { choice.remove() });
	}).exec();
	next();
});

QuestionSchema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

QuestionSchema.post('save', function (question) {
	if(this.wasNew) { Poll.findByIdAndUpdate(question.poll, { $push: { questions: question._id } }).exec(); }
});

module.exports = mongoose.model('Question', QuestionSchema);