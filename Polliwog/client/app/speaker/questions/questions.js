
angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('speaker.questions', {
        url: '/questions',
        templateUrl: 'app/speaker/questions/questions.html',
        controller: 'QuestionsCtrl'
      });
  });
