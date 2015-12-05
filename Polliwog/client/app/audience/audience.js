

angular.module('polliwogApp')
  .config(function ($stateProvider) {
    'use strict';

    $stateProvider
      /*
       * Abstract state that defines the speaker page layout
       */
      .state('audience', {
        abstract: true,
        views: {

          /*
           * The unnamed view "<div ui-view>" of index.html
           * is used to show the speakers layout
           */
          '' : {
            templateUrl: 'app/audience/layout.html'
            //controller: 'AudienceCtrl'
          }
        }
      });

  });
