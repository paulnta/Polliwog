/**
 * Created by paulnta on 28.11.15.
 */

angular.module('polliwogApp')
  .controller('LectureCtrl', function ($scope, $stateParams) {
    'use strict';
    $scope.dialOpen = false;
    $scope.toggleDial = function () {
      $scope.dialOpen = !$scope.dialOpen;
    };
    console.info({"current lecture": $stateParams.lectureId});
    $scope.currentLecture();
    /**
     * Get the currentLecture id
     * @returns lectureId
     */
    $scope.currentLecture = function () {
      console.info({"current lecture": $stateParams.lectureId});
      var current = lodash.find($scope.lectures, {_id: $stateParams.lectureId});
      console.info({lodashCurrent: current, id: $stateParams.lectureId});
      return current;
    };
  });
