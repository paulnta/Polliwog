/**
 * participation.model.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 */

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Poll = require('../poll/poll.model');
var Answer = require('../answer/answer.model');

/**
 * A participation is defined by:
 * - a parent poll,
 * - a non empty required participant name,
 * - a non required submission date with a default value of current date,
 * - an answer references array.
 */
var ParticipationSchema = new Schema({
 	poll					:	{ type: Schema.ObjectId, ref: 'Poll', required: true },
	participant		:	{ type: String, trim: true, required: true },
	submissionDate:	{ type: Date, default: Date.now },
	answers				:	[{ type: Schema.ObjectId, ref: 'Answer' }]
});

/**
 * Middleware function executed before every participation removal.
 *
 * The purpose of this function is to implement the common mechanism
 * of DELETE ON CASCADE that one can retrieve in relational databases. 
 *
 * It also implements UPDATE ON CASCADE since parent poll stores a reference
 * to the questions.
 */
ParticipationSchema.pre('remove', function (next) {
	/*
   * Update parent poll's array of participations.
   *
	 */
	Poll.findByIdAndUpdate(this.poll, { $pull: { participations: this._id } }).exec();
	
	/*
   * Removes every answer related with the current participation.
   *
   * Notice that it iterates through each answer. This is necessary
   * for triggering the answer middleware which will apply the same
   * computation by updating related question choice.
   *
   * Check Mongoose API for further information:
   * http://mongoosejs.com/docs/populate.html
   */
	Answer.find({ participation: this._id }, function (err, answers) {
		if(err) { throw err; }
		answers.forEach(function (answer) { answer.remove(); });
	}).exec();
	
	next();
});

/**
 * Middleware function executed before each participation insertion/update.
 *
 * The purpose of this function is to set a flag indicating whether it
 * is an update or an insertion.
 */
ParticipationSchema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

/**
 * Middleware function executed after each participation insertion/update.
 *
 * The purpose of this function is to update parent poll's array of participations
 * in order to maintain both sides references.
 *
 * The body of the function is executed only after an insertion. In the case of
 * an update, the algorithm will not be executed. This is checked by the test.
 */
ParticipationSchema.post('save', function () {
	if(this.isNew) { Poll.findByIdAndUpdate(this.poll, { $push: { participations: this._id } });}
});

module.exports = mongoose.model('Participation', ParticipationSchema);