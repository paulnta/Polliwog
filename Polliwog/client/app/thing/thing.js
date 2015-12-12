'use strict';

angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('thing', {
        data: {
          authenticate: {
            role: 'speaker'
          }
        },
        url: '/thing',
        templateUrl: 'app/thing/thing.html',
        controller: 'ThingCtrl'
      });
  });
