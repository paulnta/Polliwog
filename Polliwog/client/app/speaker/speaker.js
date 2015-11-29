

angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider
      /*
       * Abstract state that defines the speaker page layout
       */
      .state('speaker', {
        abstract: true,
        views: {

          /*
           * The unnamed view "<div ui-view>" of index.html
           * is used to show the speakers layout
           */
          "" : {
            templateUrl: 'app/speaker/speaker.html',
            controller: 'SpeakerCtrl'
          },

          /*
           * The named view "<div ui-view='navigation'>" of speaker.html
           * has a dynamic toolbar which can be redefined by other views.
           */
          "navigation@speaker":{
            templateUrl: 'components/speaker/toolbar/toolbar.html',
            controller: 'SpeakerCtrl'
          }
        }
      })

  });
