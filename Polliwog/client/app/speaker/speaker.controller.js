angular.module('polliwogApp')
  .controller('SpeakerCtrl', function ($scope, $state, $stateParams, Lecture, CurrentLecture) {
    'use strict';

    $scope.lectures = Lecture.query();


    $scope.showCreateSessionDialog = function () {};

  });
