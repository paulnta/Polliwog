'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('lodash'),
    Q = require('q');

var PollSchema = new Schema({
  lecture : { type: Schema.ObjectId, ref: 'Lecture', required: true },
	title : { type: String, trim: true, required: true },
	creationDate : { type: Date, default: Date.now },
	state : { type: String, default: 'draft', enum: ['draft', 'active', 'closed']},
	questions : [{ type: Schema.ObjectId, ref: 'Question' }]
});


// middleware for cascade delete
PollSchema.pre('remove', function(next) {
    var Lecture = mongoose.model('Lecture');
    Lecture.findByIdAndUpdate(this.lecture, { $pull: { polls: this._id } }, function (err) {
      if(err) console.error(err);
    });

    var Question = mongoose.model('Question');
    Question.find({ poll: this._id }, function(err, questions) {
        if (err) { console.log(err); return; }
        questions.forEach(function (question) { question.remove(); });
    });

    next();
});

// middleware for cascade updating on create
PollSchema.pre('save', function(next) {
    this.wasNew = this.isNew;
    next();
});


PollSchema.post('save', function() {
    var Lecture = mongoose.model('Lecture');
    if (this.wasNew) {
      Lecture.findByIdAndUpdate(this.lecture, {$push: {polls: this}}, function (err) {
          if(err) console.error(err);
      });
    }
});

module.exports = mongoose.model('Poll', PollSchema);
