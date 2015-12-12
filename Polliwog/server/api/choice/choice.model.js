'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChoiceSchema = new Schema({
	question : { type: Schema.ObjectId, ref: 'Question', required: true },
	key : { type: String, trim: true, required: true },
	text : { type: String, trim: true, required: true },
	answer_count : { type: Number, default: 0 }
});

// middleware for cascade delete
ChoiceSchema.pre('remove', function(next) {
    var Question = mongoose.model('Question');
    Question.findByIdAndUpdate(this.question, { $pull: { choices: this._id } }, function (err) {
      if(err) console.error(err);
    });
    next();
});

// middleware for cascade updating on create
ChoiceSchema.pre('save', function(next) {
    this.wasNew = this.isNew;
    next();
});

ChoiceSchema.post('save', function() {
    var Question = mongoose.model('Question');
    if (this.wasNew) {
      Question.findOneAndUpdate({_id: this.question}, { $push: { choices: this._id }}, function (err) {
          if(err) console.error(err);
      });
    }
});

module.exports = mongoose.model('Choice', ChoiceSchema);
