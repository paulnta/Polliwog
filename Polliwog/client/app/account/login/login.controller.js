'use strict';

angular.module('polliwogApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, TargetUrl) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
            if(TargetUrl.isEmpty()) {
              console.log("no targetUrl");
              // Logged in, redirect to home
              $location.path('/');
            } else {
              console.log("redirect to: " + TargetUrl.getUrl());
              $location.path(TargetUrl.getUrl());
              TargetUrl.reset();
            }
          })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
