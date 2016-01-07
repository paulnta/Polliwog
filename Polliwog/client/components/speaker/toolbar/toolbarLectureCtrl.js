/**
 * Created by paulnta on 07.01.16.
 */


angular.module('polliwogApp')
  .controller('toolbarLectureCtrl', function ($scope, Lecture, CurrentLecture, $stateParams, $state) {
    'use strict';

    $scope.testLecture = CurrentLecture;

    /**
     * Current active tab
     * TODO: Make this code more generic
     * @returns {string}
     */
    $scope.currentTab = function () {
      if($state.includes('questions')){
        return 'active3';

      } else if ($state.includes('polls')){
        return 'active2';

      } else if ($state.includes('lecture')){
        return 'active1';
      }
    };

    /**
     * Get the currentLecture id
     * @returns lectureId
     */
    $scope.currentLecture = function () {
      return $scope.currentLecture;
    };

  });
