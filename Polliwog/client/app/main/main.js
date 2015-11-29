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
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('cyan', {
        'default': '400', // by default use shade 400 from the pink palette for primary intentions
        'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      })

      // If you specify less than all of the keys, it will inherit from the
      // default shades
      .accentPalette('amber', {
        'default': '200' // use shade 200 for default, and keep all other shades the same
      });

      //.foregroundPalette['4'] = 'rgba(255,0,0,1)';
  });
