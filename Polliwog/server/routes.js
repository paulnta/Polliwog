/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  app.param('session_id', function(req, res, next, session_id) {
    Session.findById(session_id, function(err, session) {
        if (err) next(err);
        if (!session) return res.status(404).send('Not Found');
        
        req.body.session = session._id;
        next();
    });
  });
  
  app.param('poll_id', function(req, res, next, poll_id) {
    Poll.findOne({_id: poll_id, session: req.body.session}, function(err, poll) {
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
  app.use('/api/users', require('./api/user'));
  app.use('/api/sessions/:session_id/polls/:poll_id/questions/:question_id/choices', require('./api/choice'));
  app.use('/api/sessions/:session_id/polls/:poll_id/questions', require('./api/question'));
  app.use('/api/sessions/:session_id/polls', require('./api/poll'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
