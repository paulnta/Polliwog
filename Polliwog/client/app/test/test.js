'use strict';

angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('test', {
        url: '/test',
        templateUrl: 'app/test/test.html',
        controller: 'TestCtrl'
      });
  });