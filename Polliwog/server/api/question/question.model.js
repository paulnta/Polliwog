'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	poll : { type: Schema.ObjectId, ref: 'Poll', required: true },
	title : { type: String, trim: true, required: true },
	type : { type: String, trim: true, default: '' },
	choices	: [{ type: Schema.ObjectId, ref: 'Choice' }]
});

// middleware for cascade delete
QuestionSchema.pre('remove', function(next) {
    var Poll = mongoose.model('Poll');
    Poll.findByIdAndUpdate(this.poll, { $pull: { questions: this._id } });

    var Choice = mongoose.model('Choice');
    Choice.find({ question: this._id }, function(err, choices) {
        if (err) { console.log(err); return; }
        choices.forEach(function (choice) { choice.remove(); });
    });

    next();
});

// middleware for cascade updating on create
QuestionSchema.pre('save', function(next) {
    this.wasNew = this.isNew;
    next();
});
QuestionSchema.post('save', function() {

    var Poll = mongoose.model('Poll');
    if (this.wasNew) {
      console.info('post save question schema');
      //Poll.findByIdAndUpdate(this.poll, { $push: { questions: this } });
      Poll.findOneAndUpdate({_id: this.poll},
        {$push: {questions: this}},
        {"upsert": true},
        function (err, doc) {
          if(err)
            console.error(err);
          if(doc)
            console.log(doc);

        });
    }
});

module.exports = mongoose.model('Question', QuestionSchema);
