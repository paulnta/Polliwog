/**
 * Created by paulnta on 28.11.15.
 */

angular.module('polliwogApp')
  .controller('LectureCtrl', function ($scope) {
    'use strict';
    $scope.dialOpen = false;
    $scope.toggleDial = function () {
      $scope.dialOpen = !$scope.dialOpen;
    };
  });
