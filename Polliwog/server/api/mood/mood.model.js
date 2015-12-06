'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MoodSchema = new Schema({
  lecture :	{ type: Schema.ObjectId, ref: 'Lecture', required: true },
  date : { type: Number , required: true},
  value : { type: Number, required: true},
  reason: { type: String }
});


// middleware for cascade delete
MoodSchema.pre('remove', function(next) {
  var Lecture = mongoose.model('Lecture');
  Lecture.findByIdAndUpdate(this.lecture, { $pull: { polls: this._id } });
  next();
});

// middleware for cascade updating on create
MoodSchema.pre('save', function(next) {
  this.wasNew = this.isNew;
  next();
});
MoodSchema.post('save', function() {
  var Lecture = mongoose.model('Lecture');
  if (this.wasNew) { Lecture.findByIdAndUpdate(this.lecture, { $push: { polls: this._id } }); }
});

module.exports = mongoose.model('Mood', MoodSchema);
