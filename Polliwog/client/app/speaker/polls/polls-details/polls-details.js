angular.module('polliwogApp')
  .config(function ($stateProvider) {
    'use strict';

    $stateProvider
      /*
       * full detail state
       *
       *  Here we use the dot notation to refer to parent state (polls)
       *  we could use the parent attr but having a state called "details" has no meaning.
       */
      .state('polls.details', {
        url: '/:pollId',
        views : {
              '@speaker': {
                templateUrl: 'app/speaker/polls/polls-details/polls-details.html',
                controller: 'PollsDetailsCtrl'
              },

              /*
               * Redefines the main toolbar into an extended toolbar
               */
              'navigation@speaker': {
                templateUrl: 'components/speaker/toolbar/toolbar-extended.html'
              }
            }
      });
  });
