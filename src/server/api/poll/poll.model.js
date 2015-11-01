'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
	title					:	{ type: String, trim: true, required: true },
	creationDate 	:	{ type: Date, 	default: Date.now },
	state					:	{ type: String, default: 'draft', enum: ['draft', 'active', 'closed']},
	questions			:	[{ type: Schema.ObjectId, ref: 'Question' }],
	participations:	[{ type: Schema.ObjectId, ref: 'Participation' }]
});

module.exports = mongoose.model('Poll', PollSchema);