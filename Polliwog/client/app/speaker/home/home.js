'use strict';

angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/speaker/home/home.html',
        controller: 'HomeCtrl'
      });
  });