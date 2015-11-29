

angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('speaker', {
        abstract: true,
        views: {
          "" : {
            templateUrl: 'app/speaker/speaker.html',
            controller: 'SpeakerCtrl'
          },
          "navigation@speaker":{
            templateUrl: 'components/speaker/toolbar/toolbar.html'
          }
        }
      })

  });
