'use strict';

angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('presentation', {
        url: '/presentation',
        templateUrl: 'app/audience/presentation/presentation.html',
        controller: 'PresentationCtrl'
      });
  });