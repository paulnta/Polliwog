'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Poll = require('../poll/poll.model');
var Answer = require('../answer/answer.model');

var ParticipationSchema = new Schema({
 	poll					:	{ type: Schema.ObjectId, ref: 'Poll', required: true },
	participant		:	{ type: String, trim: true, required: true },
	submissionDate:	{ type: Date, default: Date.now },
	answers				:	[{ type: Schema.ObjectId, ref: 'Answer' }]
});

ParticipationSchema.pre('remove', function (next) {
	Poll.update({ _id: this.poll }, { $pull: { participations: this._id } }).exec();
	Answer.remove({ participation: this._id }).exec();
	next();
});

module.exports = mongoose.model('Participation', ParticipationSchema);