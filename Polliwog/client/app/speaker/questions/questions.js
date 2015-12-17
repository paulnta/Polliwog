
angular.module('polliwogApp')
  .config(function ($stateProvider) {
    'use strict';

    $stateProvider
      .state('questions', {
        parent: 'lecture',
        url: '/questions',
        views : {
          '@speaker': {
            templateUrl: 'app/speaker/questions/questions.html',
            controller: 'QuestionsCtrl'
          }
        }
      });
  });
