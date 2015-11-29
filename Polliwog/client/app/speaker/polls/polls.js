angular.module('polliwogApp')
  .config(function ($stateProvider) {
    'use strict';

    $stateProvider
      /*
       * Default state for poll
       * It shows a list of polls and a side preview
       */
      .state('polls', {
        parent: 'session',
        url: '/polls',
        views: {
          '@speaker': {
            templateUrl: 'app/speaker/polls/polls.html',
            controller: 'PollsCtrl'
          }
        }
        });
  });
