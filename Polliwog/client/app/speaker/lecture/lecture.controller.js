/**
 * Created by paulnta on 28.11.15.
 */

angular.module('polliwogApp')
  .controller('LectureCtrl', function ($scope, socket, CurrentLecture) {
    'use strict';
    $scope.dialOpen = false;
    $scope.toggleDial = function () {
      $scope.dialOpen = !$scope.dialOpen;
    };

    CurrentLecture.$promise.then(function (lecture) {
      socket.socket.emit('lecture:speakerConnect', lecture.key);
    });


    /**
     * Get the currentLecture id
     * @returns lectureId
     */
    $scope.currentLecture = function () {
      return CurrentLecture;
    };
  });
