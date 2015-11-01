/**
 * poll.model.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 */

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Question = require('../question/question.model');
var Participation = require('../participation/participation.model');

/**
 * A poll is defined by:
 * - a non empty required title,
 * - a non requred creation date with a default value,
 * - a state which possible values are {drafti, active, closed},
 * - a question references array.
 * - a participation references array. 
 */
var PollSchema = new Schema({
	title: { type: String, trim: true, required: true },
	creationDate: { type: Date, 	default: Date.now },
	state: { type: String, default: 'drafti', enum: ['drafti', 'active', 'closed']},
	questions: [{ type: Schema.ObjectId, ref: 'Question' }],
	participations:	[{ type: Schema.ObjectId, ref: 'Participation' }]
});

/**
 * Middleware function executed before every poll removal.
 *
 * The purpose of this function is to implement the common mechanism
 * of DELETE ON CASCADE that one can retrieve in relational databases.
 */
PollSchema.pre('remove', function (next) {
   /*
    * Removes every question related with the current poll.
    *
    * Notice that it iterates through each question. This is necessary
    * for triggering the question middleware which will apply the same
    * computation by iterating over each choice.
    *
    * Check Mongoose API for further information:
    * http://mongoosejs.com/docs/populate.html
    */
	Question.find({ poll: this._id }, function (err, questions) {
		if(err) { throw err; }
		questions.forEach(function (question) { question.remove(); });
	}).exec();
	
	/*
    * Removes every participation related with the current poll.
    *
    * Notice that it iterates through each participation. This is necessary
    * for triggering the participation middleware which will apply the same
    * computation by iterating over each answer.
    *
    * Check Mongoose API for further information:
    * http://mongoosejs.com/docs/populate.html
    */
	Participation.find({ poll: this._id }, function (err, participations) {
		if(err) { throw err; }
		participations.forEach(function (participation) { participation.remove(); });
	}).exec();
	
	next();
});

module.exports = mongoose.model('Poll', PollSchema);