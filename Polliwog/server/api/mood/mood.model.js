'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MoodSchema = new Schema({
  lecture :	{ type: Schema.ObjectId, ref: 'Lecture', required: true },
  date : { type: Date , required: true},
  value : { type: Number, required: true},
  reason: { type: String }
});

module.exports = mongoose.model('Mood', MoodSchema);
