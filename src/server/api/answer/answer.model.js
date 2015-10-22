'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Choice = require('../choice/choice.model');
var Participation = require('../participation/participation.model');

var AnswerSchema = new Schema({
	participation	:	{ type: Schema.ObjectId, ref: 'Participation', required: true },
	choice				:	{ type: Schema.ObjectId, ref: 'Choice', required: true }
});

AnswerSchema.pre('remove', function (next) {
	Choice.update({ _id: this.choice }, { $pull: { answers: this._id } }).exec();
	Participation.update({ _id: this.participation }, { $pull: { answers: this._id } }).exec();
	next();
});

module.exports = mongoose.model('Answer', AnswerSchema);