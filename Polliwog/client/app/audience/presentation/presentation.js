'use strict';

angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider

      /*
       * Abstract state used to prepend /presentation to the url
       */
      .state('presentation', {
        parent: 'audience',
        abstract:true,
        url: '/presentations'
      })

      /*
       * Public session for audience
       */
      .state('audienceSession', {
        parent: 'presentation',
        url: '/:sessionCode',
        views: {
          '@audience':{
            templateUrl: 'app/audience/presentation/presentation.html',
            controller: 'PresentationCtrl'
          }
        }
      });
  });
