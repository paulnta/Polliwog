'use strict';

angular.module('polliwogApp')
  .controller('LoginCtrl', function ($scope, Auth, User, $state, $location, $window, TargetUrl) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function() {
            if(TargetUrl.isEmpty()) {
              // Logged in, redirect to home
              $location.path('/');
            } else {
              var target = TargetUrl.getUrl();
              $state.go(target.name, target.params);
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
