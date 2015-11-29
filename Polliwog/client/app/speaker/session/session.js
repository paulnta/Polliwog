
angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('speaker.session', {
        url: '/session',
        views: {
          "": {
            templateUrl: 'app/speaker/session/session.html',
            controller: 'SessionCtrl'
          }
        }
      })
  });
