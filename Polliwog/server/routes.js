/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {


  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/api/polls/:poll_id/participations/:participation_id/answers', require('./api/answer'));
  app.use('/api/polls/:poll_id/participations', require('./api/participation'));
  app.use('/api/polls/:poll_id/questions/:question_id/choices', require('./api/choice'));
  app.use('/api/polls/:poll_id/questions', require('./api/question'));
  app.use('/api/polls', require('./api/poll'));
  app.use('/api/users', require('./api/user'));

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
