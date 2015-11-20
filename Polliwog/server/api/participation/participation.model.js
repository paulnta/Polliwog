'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ParticipationSchema = new Schema({
 	poll					:	{ type: Schema.ObjectId, ref: 'Poll', required: true },
	participant		:	{ type: String, trim: true, required: true },
	submissionDate:	{ type: Date, default: Date.now },
	answers				:	[{ type: Schema.ObjectId, ref: 'Answer' }]
});

module.exports = mongoose.model('Participation', ParticipationSchema);