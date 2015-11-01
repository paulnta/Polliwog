/**
 * answer.model.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 */

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Choice = require('../choice/choice.model');
var Participation = require('../participation/participation.model');

/**
 * An answer is defined by:
 * - a parent participation,
 * - a question choice.
 */
var AnswerSchema = new Schema({
	participation	:	{ type: Schema.ObjectId, ref: 'Participation', required: true },
	choice				:	{ type: Schema.ObjectId, ref: 'Choice', required: true }
});

/**
 * Middleware function executed before every answer removal.
 *
 * The purpose of this function is to implement the common mechanism
 * of UPDATE ON CASCADE that one can retrieve in relational databases
 * since parent participant and associated choice both store a reference
 * to the answer.
 */
AnswerSchema.pre('remove', function (next) {
	/*
   * Update parent participation's array of answer.
   *
	 */
	Choice.findByIdAndUpdate(this.choice, { $pull: { answers: this._id } }).exec();

	/*
   * Update associated choice's array of answers.
   *
	 */
	Participation.findByIdAndUpdate(this.participation, { $pull: { answers: this._id } }).exec();

	next();
});

/**
 * Middleware function executed before each answer insertion/update.
 *
 * The first purpose of this function is to set a flag indicating whether it
 * is an update or an insertion. The second purpose is to update associated
 * choice in case of update since updating means a priori select an other
 * question choice.
 */
AnswerSchema.pre('save', function (next) {
	/*
	 * Update if exists associated question choice by removing answer reference
	 * from choice answers array.
	 */
	if (this.wasNew) { Choice.findByIdAndUpdate(this.choice, { $pull: { answers: this._id } }).exec(); }
	
	this.wasNew = this.isNew;
	
	next();
});

/**
 * Middleware function executed after each choice insertion/update.
 *
 * The first purpose of this function is to update parent participation's array of answers
 * in order to maintain both sides references. The second purpose is to update associated choice
 * references array of answers.
 *
 * A test is used to distinguish between an insert or an update event.
 */
AnswerSchema.post('save', function (answer) {
	
	Choice.findByIdAndUpdate(this.choice, { $push: { answers: answer._id } }).exec();
	
	if (this.wasNew) { Participation.findByIdAndUpdate(this.participation, { $push: { answers: answer._id } }).exec(); }
});

module.exports = mongoose.model('Answer', AnswerSchema);