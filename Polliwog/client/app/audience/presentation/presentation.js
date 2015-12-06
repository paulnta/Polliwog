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
       * Public lecture for audience
       */
      .state('audienceLecture', {
        parent: 'presentation',
        url: '/:lectureCode',
        views: {
          '@audience':{
            templateUrl: 'app/audience/presentation/presentation.html',
            controller: 'PresentationCtrl'
          }
        }
      });
  });
