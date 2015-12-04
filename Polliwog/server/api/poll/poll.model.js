'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
    session : { type: Schema.ObjectId, ref: 'Session', required: true },
	title : { type: String, trim: true, required: true },
	creationDate : { type: Date, default: Date.now },
	state : { type: String, default: 'draft', enum: ['draft', 'active', 'closed']},
	questions : [{ type: Schema.ObjectId, ref: 'Question' }]
});

// middleware for cascade delete
PollSchema.pre('remove', function(next) {
    var Session = mongoose.model('Session');
    Session.findByIdAndUpdate(this.session, { $pull: { polls: this._id } });
    
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
    var Session = mongoose.model('Session');
    if (this.wasNew) { Session.findByIdAndUpdate(this.session, { $push: { polls: this._id } }); }
});

module.exports = mongoose.model('Poll', PollSchema);