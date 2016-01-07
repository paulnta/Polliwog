angular.module('polliwogApp')
  .controller('SpeakerCtrl', function ($scope, $state, $stateParams, Lecture, CurrentLecture) {
    'use strict';

    $scope.lectures = Lecture.query();

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
      return CurrentLecture;
    };

    $scope.showCreateSessionDialog = function () {};

  });
