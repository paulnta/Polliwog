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
	Poll.update({ _id: this.poll }, { $pull: { questions: this._id } }).exec();
	Choice.remove({ question: this._id }).exec();
	next();
});

module.exports = mongoose.model('Question', QuestionSchema);