/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var auth = require('./auth/auth.service');
var Lecture = require('./api/lecture/lecture.model');
var Poll = require('./api/poll/poll.model');
var Question = require('./api/question/question.model');

module.exports = function(app) {

  app.param('lecture_id', function(req, res, next, lecture_id) {
    Lecture.findById(lecture_id, function(err, lecture) {
        if (err) next(err);
        if (!lecture) return res.status(404).send('Not Found');

        req.body.lecture = lecture._id;
        next();
    });
  });

  app.param('poll_id', function(req, res, next, poll_id) {
    Poll.findOne({_id: poll_id, lecture: req.body.lecture}, function(err, poll) {
        if (err) next(err);
        if (!poll) return res.status(404).send('Not Found');

        req.body.poll = poll._id;
        next();
    });
  });

  app.param('question_id', function(req, res, next, question_id) {
    Question.findOne({_id: question_id, poll: req.body.poll}, function(err, question) {
        if (err) next(err);
        if (!question) return res.status(404).send('Not Found');

        req.body.question = question._id;
        next();
    });
  });

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/lectures', auth.isAuthenticated(), require('./api/lecture'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/lectures/:lecture_id/polls/:poll_id/questions/:question_id/choices', auth.isAuthenticated(), require('./api/choice'));
  app.use('/api/lectures/:lecture_id/polls/:poll_id/questions',  auth.isAuthenticated(), require('./api/question'));
  app.use('/api/lectures/:lecture_id/polls',  auth.isAuthenticated(), require('./api/poll'));
  app.use('/api/lectures/:lecture_id/resources', auth.isAuthenticated(), require('./api/resource'));

  app.use('/api/polls', auth.isAuthenticated(), require('./api/poll'));
  app.use('/api/questions', auth.isAuthenticated(), require('./api/question'));
  app.use('/api/choices', auth.isAuthenticated(), require('./api/choice'));


  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  app.route('/scroll')
    .get(function (req,res) {
      res.sendFile(path.resolve(app.get('appPath') + '/scroll.html'));
    });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
