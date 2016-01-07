/**
 * Created by paulnta on 28.11.15.
 */

angular.module('polliwogApp')
  .controller('LectureCtrl', function ($scope, CurrentLecture, $stateParams) {
    'use strict';
    $scope.dialOpen = false;
    $scope.toggleDial = function () {
      $scope.dialOpen = !$scope.dialOpen;
    };

    /**
     * Get the currentLecture id
     * @returns lectureId
     */
    $scope.currentLecture = function () {
      return CurrentLecture;
    };
  });
