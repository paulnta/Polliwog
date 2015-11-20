'use strict';

angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('join', {
        url: '/join',
        templateUrl: 'app/audience/join/join.html',
        controller: 'JoinCtrl'
      });
  });