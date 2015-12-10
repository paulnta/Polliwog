'use strict';

angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  })

  /**
   *  Colors and theme
   */
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('cyan', {
        'default': '400',

         // use md-hue-1, md-hue-2, md-hue-3 css class

        'hue-1': '100',
        'hue-2': '600',
        'hue-3': 'A100'
      })

      .accentPalette('yellow', {
        'default': '300'
      });
  });
