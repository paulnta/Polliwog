/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  app.param('poll_id', function(req, res, next, poll_id) {
    Poll.findById(poll_id, function(err, poll) {
        if (err) next(err); //return res.status(500).send(err);
        if (!poll) return res.status(404).send(err);
        
        req.body.poll = poll;
        next();
    });
  });
  
  app.param('question_id', function(req, res, next, question_id) {
    Question.findOne({_id: question_id, poll: req.body.poll._id}, function(err, question) {
        if (err) next(err); //return res.status(500).send(err);
        if (!question) return res.status(404).send(err);
        
        req.body.question = question;
        next();
    });
  });
  
  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/api/polls/:poll_id/questions/:question_id/choices', require('./api/choice'));
  app.use('/api/polls/:poll_id/questions', require('./api/question'));
  app.use('/api/polls', require('./api/poll'));

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
