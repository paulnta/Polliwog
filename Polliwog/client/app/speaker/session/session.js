
angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('speaker.session', {
        url: '/session',
        templateUrl: 'app/speaker/session/session.html',
        controller: 'SessionCtrl'
      })
  });
