/**
 * choice.model.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 */

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Question = require('../question/question.model');
var Answer = require('../answer/answer.model');

/**
 * A choice is defined by:
 * - a parent question,
 * - a non empty required key,
 * - a non empty required text,
 * - a answer references array.
 */
var ChoiceSchema = new Schema({
	question:	{ type: Schema.ObjectId, ref: 'Question', required: true },
	key			:	{ type: String, trim: true, required: true },
	text		:	{ type: String, trim: true, required: true },
	answers	:	[{ type: Schema.ObjectId, ref: 'Answer' }]
});

/**
 * Middleware function executed before every choice removal.
 *
 * The purpose of this function is to implement the common mechanism
 * of DELETE ON CASCADE that one can retrieve in relational databases. 
 *
 * It also implements UPDATE ON CASCADE since parent question stores a reference
 * to the questions.
 */
ChoiceSchema.pre('remove', function (next) {
	/*
   * Update parent question's array of choices.
   *
	 */
	Question.findByIdAndUpdate(this.question, { $pull: { choices: this._id } }).exec();

	/*
   * Removes every answer related with the current choice.
   *
   * Notice that it iterates through each answer. This is necessary
   * for triggering the answer middleware which will apply the same
   * computation by deleting related participant answer.
   *
   * Check Mongoose API for further information:
   * http://mongoosejs.com/docs/populate.html
   */
	Answer.find({ _id: { $in: this.answers } }, function (err, answers) {
		if(err) { throw err; }
		answers.forEach(function (answer) { answer.remove(); });
	}).exec();
	next();
});

/**
 * Middleware function executed before each choice insertion/update.
 *
 * The purpose of this function is to set a flag indicating whether it
 * is an update or an insertion.
 */
ChoiceSchema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

/**
 * Middleware function executed after each choice insertion/update.
 *
 * The purpose of this function is to update parent question's array of choices
 * in order to maintain both sides references.
 *
 * The body of the function is executed only after an insertion. In the case of
 * an update, the algorithm will not be executed. This is checked by the test.
 */
ChoiceSchema.post('save', function () {
	if(this.wasNew) { Question.findByIdAndUpdate(this.question, { $push: { choices: this._id } }).exec(); }
});

module.exports = mongoose.model('Choice', ChoiceSchema);