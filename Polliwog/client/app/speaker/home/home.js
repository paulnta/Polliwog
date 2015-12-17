'use strict';

angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('speaker.home', {
        url: '/home',
        views : {

          /*
           * The unnamed view (@speaker) of the speaker state  (using speaker.html as template),
           * shows our lecture content
           *
           * All other sibling views : Polls, Questions, will use the same element view
           * to show their content.
           */
          'navigation@speaker': {
            templateUrl: 'components/speaker/toolbar/toolbar-home.html'
          },

          '@speaker': {
            templateUrl: 'app/speaker/home/home.html',
            controller: 'HomeCtrl'
          }
        }
      });
  });
