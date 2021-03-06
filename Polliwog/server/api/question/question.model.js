'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Choice Schema
 */
var ChoiceSchema = new Schema({
  key : { type: String, trim: true, required: true },
  text : { type: String, trim: true, required: true },
  answer_count : { type: Number, default: 0 }
});

mongoose.model('Choice', ChoiceSchema);

/**
 * Question Schema
 */
var QuestionSchema = new Schema({
	poll : { type: Schema.ObjectId, ref: 'Poll', required: true },
	title : { type: String, trim: true, required: true },
	type : { type: String, trim: true, default: '' },
  choices	: [ChoiceSchema],
  nb_participation : {type: Number, required: true, default: 0}
});

// middleware for cascade delete
QuestionSchema.pre('remove', function(next) {

    // delete associated poll
    var Poll = mongoose.model('Poll');
    Poll.findByIdAndUpdate(this.poll, { $pull: { questions: this._id } }, function (err) {
      if(err) console.error(err);
    });
    next();
});

// middleware for cascade updating on create
QuestionSchema.pre('save', function(next) {
    this.wasNew = this.isNew;
    var sum = 0;
    var n = this.choices.length;
    if(n == 0) {
      next();
    }
    else {
      for (var i = 0; i < n; i++) {
        sum += this.choices[i].answer_count;
        if (i == n-1) {
          this.nb_participation = sum;
          next();
        }
      }
    }

});

QuestionSchema.post('save', function() {

    // add in poll
    var Poll = mongoose.model('Poll');
    if (this.wasNew) {
      Poll.findOneAndUpdate({_id: this.poll}, {$push: {questions: this}}, function (err, product) {
          if(err) console.error(err);
      });
    }
});

module.exports = mongoose.model('Question', QuestionSchema);
