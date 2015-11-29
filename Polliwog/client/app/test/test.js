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
  //.config(['$mdIconProvider', function($mdIconProvider) {
  //  $mdIconProvider
  //    .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
  //    .defaultIconSet('img/icons/sets/core-icons.svg', 24);
  //}]);
