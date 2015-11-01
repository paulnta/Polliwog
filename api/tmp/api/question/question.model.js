/**
 * question.model.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 */

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Poll = require('../poll/poll.model');
var Choice = require('../choice/choice.model');

/**
 * A question is defined by:
 * - a parent poll,
 * - a non empty required title,
 * - a non empty non required type,
 * - a choice references array.
 */
var QuestionSchema = new Schema({
	poll		:	{ type: Schema.ObjectId, ref: 'Poll', required: true },
	title		:	{ type: String, trim: true, required: true },
	type		:	{ type: String, trim: true, default: '' },
	choices	:	[{ type: Schema.ObjectId, ref: 'Choice' }]
});

/**
 * Middleware function executed before every question removal.
 *
 * The purpose of this function is to implement the common mechanism
 * of DELETE ON CASCADE that one can retrieve in relational databases. 
 *
 * It also implements UPDATE ON CASCADE since parent poll stores a reference
 * to the questions.
 */
QuestionSchema.pre('remove', function (next) {
	/*
   * Update parent poll's array of questions.
   *
	 */
	Poll.findByIdAndUpdate(this.poll, { $pull: { questions: this._id } }).exec();

	/*
   * Removes every choice related with the current question.
   *
   * Notice that it iterates through each choice. This is necessary
   * for triggering the answer middleware which will apply the same
   * computation by deleting related participant answer.
   *
   * Check Mongoose API for further information:
   * http://mongoosejs.com/docs/populate.html
   */
	Choice.find({ question: this._id }, function (err, choices) {
		if(err) { throw err; }
		choices.forEach(function (choice) { choice.remove() });
	}).exec();
	next();
});

/**
 * Middleware function executed before each question insertion/update.
 *
 * The purpose of this function is to set a flag indicating whether it
 * is an update or an insertion.
 */
QuestionSchema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

/**
 * Middleware function executed after each question insertion/update.
 *
 * The purpose of this function is to update parent poll's array of questions
 * in order to maintain both sides references.
 *
 * The body of the function is executed only after an insertion. In the case of
 * an update, the algorithm will not be executed. This is checked by the test.
 */
QuestionSchema.post('save', function (question) {
	if(this.wasNew) { Poll.findByIdAndUpdate(question.poll, { $push: { questions: question._id } }).exec(); }
});

module.exports = mongoose.model('Question', QuestionSchema);