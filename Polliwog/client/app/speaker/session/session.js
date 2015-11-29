/**
 * sessions/ list of sessions
 * sessions/:sessionId
 * sessions/:sessionId/polls
 * sessions/:sessionId/questions
 *
 */
angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('speaker.sessions', {
        url: '/sessions',
        abstract: true
      })
      .state('session', {
        parent: 'speaker.sessions',
        url: '/:sessionId',
        views : {
          "@speaker": {
            templateUrl: 'app/speaker/session/session.html',
            controller: 'SessionCtrl'
          }
        }
      })

  });
