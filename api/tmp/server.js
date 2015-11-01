var _ 					= require('lodash');
var express 		= require('express');
var app					= express();
var bodyParser 	= require('body-parser');
var mongoose 		= require('mongoose');
var Schema 			= mongoose.Schema;
var port 				= process.env.PORT || 3000;
var router 			= express.Router();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////SCHEMAS
//*****************************Poll
var PollSchema = new Schema({
  title         : { type: String, trim: true, required: true },
  creationDate  : { type: Date,   default: Date.now },
  state         : { type: String, default: 'drafti', enum: ['drafti', 'active', 'closed']},
  questions     : [{ type: Schema.ObjectId, ref: 'Question' }],
  participations: [{ type: Schema.ObjectId, ref: 'Participation' }]
});

PollSchema.pre('remove', function (next) {
  Question.find({ poll: this._id }, function (err, questions) {
    if(err) { throw err; }
    questions.forEach(function (question) { question.remove(); });
  }).exec();
  Participation.find({ poll: this._id }, function (err, participations) {
    if(err) { throw err; }
    participations.forEach(function (participation) { participation.remove(); });
  }).exec();
  next();
});

//*****************************Question
var QuestionSchema = new Schema({
  poll    : { type: Schema.ObjectId, ref: 'Poll', required: true },
  title   : { type: String, trim: true, required: true },
  type    : { type: String, trim: true, default: '' },
  choices : [{ type: Schema.ObjectId, ref: 'Choice' }]
});

QuestionSchema.pre('remove', function (next) {
  Poll.findByIdAndUpdate(this.poll, { $pull: { questions: this._id } }).exec();
  Choice.find({ question: this._id }, function (err, choices) {
    if(err) { throw err; }
    choices.forEach(function (choice) { choice.remove() });
  }).exec();
  next();
});

QuestionSchema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next();
});

QuestionSchema.post('save', function (question) {
  if(this.wasNew) { Poll.findByIdAndUpdate(question.poll, { $push: { questions: question._id } }).exec(); }
});

//*****************************Choice
var ChoiceSchema = new Schema({
  question: { type: Schema.ObjectId, ref: 'Question', required: true },
  key     : { type: String, trim: true, required: true },
  text    : { type: String, trim: true, required: true },
  answers : [{ type: Schema.ObjectId, ref: 'Answer' }]
});

ChoiceSchema.pre('remove', function (next) {
  Question.findByIdAndUpdate(this.question, { $pull: { choices: this._id } }).exec();
  Answer.find({ _id: { $in: this.answers } }, function (err, answers) {
    if(err) { throw err; }
    answers.forEach(function (answer) { answer.remove(); });
  }).exec();
  next();
});

ChoiceSchema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next();
});

ChoiceSchema.post('save', function () {
  if(this.wasNew) { Question.findByIdAndUpdate(this.question, { $push: { choices: this._id } }).exec(); }
});

//*****************************Participation
var ParticipationSchema = new Schema({
  poll          : { type: Schema.ObjectId, ref: 'Poll', required: true },
  participant   : { type: String, trim: true, required: true },
  submissionDate: { type: Date, default: Date.now },
  answers       : [{ type: Schema.ObjectId, ref: 'Answer' }]
});

ParticipationSchema.pre('remove', function (next) {
  Poll.findByIdAndUpdate(this.poll, { $pull: { participations: this._id } }).exec();
  Answer.find({ participation: this._id }, function (err, answers) {
    if(err) { throw err; }
    answers.forEach(function (answer) { answer.remove(); });
  }).exec();
  next();
});

ParticipationSchema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next();
});

ParticipationSchema.post('save', function () {
  if(this.isNew) { Poll.findByIdAndUpdate(this.poll, { $push: { participations: this._id } });}
});

//*****************************Answer
var AnswerSchema = new Schema({
  participation : { type: Schema.ObjectId, ref: 'Participation', required: true },
  choice        : { type: Schema.ObjectId, ref: 'Choice', required: true }
});

AnswerSchema.pre('remove', function (next) {
  Choice.findByIdAndUpdate(this.choice, { $pull: { answers: this._id } }).exec();
  Participation.findByIdAndUpdate(this.participation, { $pull: { answers: this._id } }).exec();
  next();
});

AnswerSchema.pre('save', function (next) {
  if (this.wasNew) { Choice.findByIdAndUpdate(this.choice, { $pull: { answers: this._id } }).exec(); }
  this.wasNew = this.isNew;
  next();
});

AnswerSchema.post('save', function (answer) {
  Choice.findByIdAndUpdate(this.choice, { $push: { answers: answer._id } }).exec();
  if (this.wasNew) { Participation.findByIdAndUpdate(this.participation, { $push: { answers: answer._id } }).exec(); }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////MODELS
var Poll 					= mongoose.model('Poll', PollSchema);
var Question 			= mongoose.model('Question', QuestionSchema);
var Choice 				= mongoose.model('Choice', ChoiceSchema);
var Participation = mongoose.model('Participation', ParticipationSchema);
var Answer        = mongoose.model('Answer', AnswerSchema);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////CONTROLLERS
var pollctrl = {};
var quesctrl = {};
var partctrl = {};
var choictrl = {};
var answctrl = {};

//*****************************Poll
// Get list of polls
pollctrl.index = function (req, res) {
  Poll.find(function (err, polls) {
    if(err) { return handleError(res, err); }
    for (var j = polls.length - 1; j >= 0; j--) {
      for (var i = polls[j].questions.length - 1; i >= 0; i--) {
        polls[j].questions[i] = req.url + '/' + polls[j]._id + '/questions/' + polls[j].questions[i];
      }
      for (var i = polls[j].participations.length - 1; i >= 0; i--) {
        polls[j].participations[i] = req.url + '/' + polls[j]._id + '/participations/' + polls[j].participations[i];
      }
    }
    return res.status(200).json(polls);
  });
};

// Get a single poll
pollctrl.show = function (req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); } 
    for (var i = poll.questions.length - 1; i >= 0; i--) {
      poll.questions[i] = req.url + '/questions/' + poll.questions[i];
    }
    for (var i = poll.participations.length - 1; i >= 0; i--) {
      poll.participations[i] = req.url + '/participations/' + poll.participations[i];
    }
    return res.json(poll);
  });
};

// Creates a new poll in the DB.
pollctrl.create = function (req, res) {
  if(req.body.questions) { delete req.body.questions; }
  if(req.body.participations) { delete req.body.participations; }
  Poll.create(req.body, function (err, poll) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(poll);
  });
};

// Updates an existing poll in the DB.
pollctrl.update = function (req, res) {
  if(req.body._id) { delete req.body._id; }
  if(req.body.questions) { delete req.body.questions; }
  if(req.body.participations) { delete req.body.participations; }
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    var updated = _.merge(poll, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      for (var i = poll.questions.length - 1; i >= 0; i--) {
        poll.questions[i] = req.url + '/questions/' + poll.questions[i];
      }
      for (var i = poll.participations.length - 1; i >= 0; i--) {
        poll.participations[i] = req.url + '/participations/' + poll.participations[i];
      }
      return res.status(200).json(poll);
    });
  });
};

// Deletes a poll from the DB.
pollctrl.destroy = function (req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    poll.remove(function (err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

//*****************************Question
// Get list of questions
quesctrl.index = function (req, res) {
  Question.find({ poll: req.params.poll_id }, function (err, questions) {
    if(err) { return handleError(res, err); }
    for (var j = questions.length - 1; j >= 0; j--) {
      for (var i = questions[j].choices.length - 1; i >= 0; i--) {
        questions[j].choices[i] = req.url + '/' + questions[j]._id + '/choices/' + questions[j].choices[i];
      }
    }
    return res.status(200).json(questions);
  });
};

// Get a single question
quesctrl.show = function (req, res) {
  Question.findOne({ _id: req.params.id, poll: req.params.poll_id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    for (var i = question.choices.length - 1; i >= 0; i--) {
      question.choices[i] = req.url + '/choices/' + question.choices[i];
    }
    return res.json(question);
  });
};

// Creates a new question in the DB.
quesctrl.create = function (req, res) {
  req.body.poll = req.params.poll_id;
  if(req.body.choices) { delete req.body.choices; }
  Question.create(req.body, function (err, question) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(question);
  });
};

// Updates an existing question in the DB.
quesctrl.update = function (req, res) {
  if(req.body._id) { delete req.body._id; }
  if(req.body.poll) { delete req.body.poll; }
  if(req.body.choices) { delete req.body.choices; }
  Question.findOne({ _id: req.params.id, poll: req.params.poll_id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    var updated = _.merge(question, req.body);
    updated.save(function (err) {
      if(err) { return handleError(res, err); }
      for (var i = question.choices.length - 1; i >= 0; i--) {
        question.choices[i] = req.url + '/choices/' + question.choices[i];
      }
      return res.status(200).json(question);
    });
  });
};

// Deletes a question from the DB.
quesctrl.destroy = function (req, res) {
  Question.findOne({ _id: req.params.id, poll: req.params.poll_id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    question.remove(function (err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

//*****************************Choice
// Get list of choices
choictrl.index = function (req, res) {
  Question.findOne({ _id: req.params.question_id, poll: req.params.poll_id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    Choice.find({ question: req.params.question_id }, function (err, choices) {
      if(err) { return handleError(res, err); }
      for (var j = choices.length - 1; j >= 0; j--) {
        choices[j].populate('answers', function(err, choice) {
          if(err) { return handleError(res, err); }
          for (var i = choice.answers.length - 1; i >= 0; i--) {
            choice.answers[i] = req.url.substring(0, req.url.indexOf('/questions')) + '/participations/' + choice.answers[i].participation + '/answers/' + choice.answers[i]._id;
          }
        });
      }
      return res.status(200).json(choices);
    });
  });
};

// Get a single choice
choictrl.show = function (req, res) {
  Question.findOne({ _id: req.params.question_id, poll: req.params.poll_id, choices: req.params.id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    Choice.findById(req.params.id, function (err, choice) {
      if(err) { return handleError(res, err); }
      if(!choice) { return res.status(404).send('Not Found'); }
      choice.populate('answers', function(err, choice) {
        if(err) { return handleError(res, err); }
        for (var i = choice.answers.length - 1; i >= 0; i--) {
          choice.answers[i] = req.url.substring(0, req.url.indexOf('/questions')) + '/participations/' + choice.answers[i].participation + '/answers/' + choice.answers[i]._id;
        }
        return res.json(choice);
      });
    });
  });
};

// Creates a new choice in the DB.
choictrl.create = function (req, res) {
  Question.findOne({ _id: req.params.question_id, poll: req.params.poll_id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    if(req.body.answers) { delete req.body.answers; }
    req.body.question = req.params.question_id;
    Choice.create(req.body, function (err, choice) {
      if(err) { return handleError(res, err); }
      return res.status(201).json(choice);
    });
  });
};

// Updates an existing choice in the DB.
choictrl.update = function (req, res) {
  Question.findOne({ _id: req.params.question_id, poll: req.params.poll_id, choices: req.params.id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    if(req.body._id) { delete req.body._id; }
    if(req.body.question) { delete req.body.question; }
    if(req.body.answers) { delete req.body.answers; }
    Choice.findById(req.params.id, function (err, choice) {
      if (err) { return handleError(res, err); }
      if(!choice) { return res.status(404).send('Not Found'); }
      var updated = _.merge(choice, req.body);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        choice.populate('answers', function(err, choice) {
          if(err) { return handleError(res, err); }
          for (var i = choice.answers.length - 1; i >= 0; i--) {
            choice.answers[i] = req.url.substring(0, req.url.indexOf('/questions')) + '/participations/' + choice.answers[i].participation + '/answers/' + choice.answers[i]._id;
          }
          return res.status(200).json(choice);
        });
      });
    });
  });
};

// Deletes a choice from the DB.
choictrl.destroy = function (req, res) {
  Question.findOne({ _id: req.params.question_id, poll: req.params.poll_id, choices: req.params.id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    Choice.findById(req.params.id, function (err, choice) {
      if(err) { return handleError(res, err); }
      if(!choice) { return res.status(404).send('Not Found'); }
      choice.remove(function (err) {
        if(err) { return handleError(res, err); }
        return res.status(204).send('No Content');
      });
    });
  });
};

//*****************************Participation
// Get list of participations
partctrl.index = function (req, res) {
  Participation.find({ poll: req.params.poll_id }, function (err, participations) {
    if(err) { return handleError(res, err); }
    for (var j = participations.length - 1; j >= 0; j--) {
      for (var i = participations[j].answers.length - 1; i >= 0; i--) {
        participations[j].answers[i] = req.url + '/' + participations[j]._id + '/answers/' + participations[j].answers[i];
      }
    }
    return res.status(200).json(participations);
  });
};

// Get a single participation
partctrl.show = function (req, res) {
  Participation.findOne({ _id: req.params.id, poll: req.params.poll_id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    for (var i = participation.answers.length - 1; i >= 0; i--) {
      participation.answers[i] = req.url + '/answers/' + participation.answers[i];
    }
    return res.json(participation);
  });
};

// Creates a new participation in the DB.
partctrl.create = function (req, res) {
  req.body.poll = req.params.poll_id;
  if(req.body.answers) { delete req.body.answers; }
  Participation.create(req.body, function (err, participation) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(participation);
  });
};

// Updates an existing participation in the DB.
partctrl.update = function (req, res) {
  if(req.body._id) { delete req.body._id; }
  if(req.body.poll) { delete req.body.poll; }
  if(req.body.answers) { delete req.body.answers; }
  Participation.findOne({ _id: req.params.id, poll: req.params.poll_id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    var updated = _.merge(participation, req.body);
    updated.save(function (err) {
      if(err) { return handleError(res, err); }
      for (var i = participation.answers.length - 1; i >= 0; i--) {
        participation.answers[i] = req.url + '/answers/' + participation.answers[i];
      }
      return res.status(200).json(participation);
    });
  });
};

// Deletes a participation from the DB.
partctrl.destroy = function (req, res) {
  Participation.findOne({ _id: req.params.id, poll: req.params.poll_id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    participation.remove(function (err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

//*****************************Answer
// Get list of answers
answctrl.index = function(req, res) {
  Participation.findOne({ _id: req.params.participation_id, poll: req.params.poll_id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    Answer.find({ participation: req.params.participation_id }, function (err, answers) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(answers);
    });
  });
};

// Get a single answer
answctrl.show = function(req, res) {
  Participation.findOne({ _id: req.params.participation_id, poll: req.params.poll_id, answers: req.params.id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    Answer.findById(req.params.id, function (err, answer) {
      if(err) { return handleError(res, err); }
      if(!answer) { return res.status(404).send('Not Found'); }
      return res.json(answer);
    });
  });
};

// Creates a new answer in the DB.
answctrl.create = function(req, res) {
  if(!req.query.question) { return res.status(400).send('Bad Request'); }
  if(!req.query.choice) { return res.status(400).send('Bad Request'); }
  Participation.findOne({ _id: req.params.participation_id, poll: req.params.poll_id }, function(err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    Question.findOne({ _id : req.query.question, poll: req.params.poll_id, choices: req.query.choice }, function (err, question) {
      if(err) { return handleError(res, err); }
      if(!question) { return res.status(404).send('Not Found'); }
      Answer.findOne({ participation: req.params.participation_id, choice: req.query.choice }, function(err, answer) {
        if(err) { return handleError(res, err); }
        if(answer) { return res.status(409).send('Conflict'); } // already answered with this choice
        Answer.create({ participation: req.params.participation_id, choice: req.query.choice }, function (err, answer) {
          if(err) { return handleError(res, err); }
          return res.status(201).json(answer);
        });
      });
    });
  });
};

// Updates an existing answer in the DB.
answctrl.update = function(req, res) {
  if(!req.query.question) { return res.status(400).send('Bad Request'); }
  if(!req.query.choice) { return res.status(400).send('Bad Request'); }
  Participation.findOne({ _id: req.params.participation_id, poll: req.params.poll_id, answers: req.params.id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    Answer.findById(req.params.id, function (err, answer) {
      if (err) { return handleError(res, err); }
      if(!answer) { return res.status(404).send('Not Found'); }
      Question.findOne({ _id: req.query.question, choices: { $in: [req.query.choice, answer.choice] } }, function (err, question) {
        if (err) { return handleError(res, err); }
        if(!question) { return  res.status(400).send('Bad Request'); }
        answer.choice = req.query.choice;
        answer.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.status(200).json(answer);
        });
      });
    });
  });
};

// Deletes a answer from the DB.
answctrl.destroy = function(req, res) {
  Participation.findOne({ _id: req.params.participation_id, poll: req.params.poll_id, answers: req.params.id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    Answer.findById(req.params.id, function (err, answer) {
      if(err) { return handleError(res, err); }
      if(!answer) { return res.status(404).send('Not Found'); }
      answer.remove(function(err) {
        if(err) { return handleError(res, err); }
        return res.status(204).send('No Content');
      });
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

mongoose.connect("mongodb://localhost:27017/polly");

app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

router.get('/polls', pollctrl.index);
router.get('/polls/:id', pollctrl.show);
router.post('/polls', pollctrl.create);
router.put('/polls/:id', pollctrl.update);
router.patch('/polls/:id', pollctrl.update);
router.delete('/polls/:id', pollctrl.destroy);

router.get('/polls/:poll_id/questions', quesctrl.index);
router.get('/polls/:poll_id/questions/:id', quesctrl.show);
router.post('/polls/:poll_id/questions', quesctrl.create);
router.put('/polls/:poll_id/questions/:id', quesctrl.update);
router.patch('/polls/:poll_id/questions/:id', quesctrl.update);
router.delete('/polls/:poll_id/questions/:id', quesctrl.destroy);

router.get('/polls/:poll_id/participations', partctrl.index);
router.get('/polls/:poll_id/participations/:id', partctrl.show);
router.post('/polls/:poll_id/participations', partctrl.create);
router.put('/polls/:poll_id/participations/:id', partctrl.update);
router.patch('/polls/:poll_id/participations/:id', partctrl.update);
router.delete('/polls/:poll_id/participations/:id', partctrl.destroy);

router.get('/polls/:poll_id/questions/:question_id/choices', choictrl.index);
router.get('/polls/:poll_id/questions/:question_id/choices/:id', choictrl.show);
router.post('/polls/:poll_id/questions/:question_id/choices', choictrl.create);
router.put('/polls/:poll_id/questions/:question_id/choices/:id', choictrl.update);
router.patch('/polls/:poll_id/questions/:question_id/choices/:id', choictrl.update);
router.delete('/polls/:poll_id/questions/:question_id/choices/:id', choictrl.destroy);

router.get('/polls/:poll_id/participations/:participation_id/answers', answctrl.index);
router.get('/polls/:poll_id/participations/:participation_id/answers/:id', answctrl.show);
router.post('/polls/:poll_id/participations/:participation_id/answers', answctrl.create);
router.put('/polls/:poll_id/participations/:participation_id/answers/:id', answctrl.update);
router.patch('/polls/:poll_id/participations/:participation_id/answers/:id', answctrl.update);
router.delete('/polls/:poll_id/participations/:participation_id/answers/:id', answctrl.destroy);

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);