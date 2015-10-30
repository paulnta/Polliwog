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
	Choice.findByIdAndUpdate(this.choice, { $pull: { answers: this._id } }).exec();
	Participation.findByIdAndUpdate(this.participation, { $pull: { answers: this._id } }).exec();
	next();
});

AnswerSchema.pre('save', function (next) {
	if (this.wasNew) { Choice.findByIdAndUpdate(this.choice, { $pull: { answers: this._id } }).exec(); }
	this.wasNew = this.isNew;
	next();
});

AnswerSchema.post('save', function (answer) {
	Choice.findByIdAndUpdate(this.choice, { $push: { answers: answer._id } }).exec();
	if (this.wasNew) { Participation.findByIdAndUpdate(this.participation, { $push: { answers: answer._id } }).exec(); }
});

module.exports = mongoose.model('Answer', AnswerSchema);