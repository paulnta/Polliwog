'use strict';

angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('thing', {
        url: '/thing',
        templateUrl: 'app/thing/thing.html',
        controller: 'ThingCtrl'
      });
  });