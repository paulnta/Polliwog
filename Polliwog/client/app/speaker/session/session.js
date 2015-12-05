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

      /*
       * This state is just used to prepend /sessions
       * to all urls
       *
       * We could use this state to show a session list.
       * But for now, sessions are listed in the side navigation
       */
      .state('speaker.sessions', {
        url: '/sessions',
        abstract: true,
      })

      /*
       * Note that the name of this state doesn't use the dot notation
       * because we want to keep short names when creating links.
       * So we need to use the parent attr to refer to the parent state.
       *
       * To create a link to this state, use : ui-sref="session({sessionId: <your-session-id>})"
       */
      .state('session', {
        parent: 'speaker.sessions',
        url: '/:sessionId',
        views : {

          /*
           * The unnamed view (@speaker) of the speaker state  (using speaker.html as template),
           * shows our session content
           *
           * All other sibling views : Polls, Questions, will use the same element view
           * to show their content.
           */
          "@speaker": {
            templateUrl: 'app/speaker/session/session.html',
            controller: 'SessionCtrl'
          }
        }
      })

  });
