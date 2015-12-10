angular.module('polliwogApp')
  .controller('SpeakerCtrl', function ($scope, $state, Lecture, Mood, $mdSidenav, User) {
    'use strict';

    $scope.lectures = Lecture.list();

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
     * Navigates to another lecture
     * @param lectureId
     */
    $scope.goTo = function (lectureId) {
      $state.go('lecture', {lectureId: lectureId});
      setTimeout(function () {
        $mdSidenav('left').close();
      }, 200);
    };

    /**
     * Get the currentLecture id
     * @returns lectureId
     */
    $scope.currentLecture = function () {
      return Lecture.current();
    };

  });
