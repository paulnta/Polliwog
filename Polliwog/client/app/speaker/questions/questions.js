
angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questions', {
        parent: 'session',
        url: '/questions',
        views : {
          "@speaker": {
            templateUrl: 'app/speaker/questions/questions.html',
            controller: 'QuestionsCtrl'
          }
        }
      });
  });
