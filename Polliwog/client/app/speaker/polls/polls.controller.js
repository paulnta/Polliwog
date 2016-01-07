/**
 * Created by paulnta on 28.11.15.
 */

angular.module('polliwogApp')
  .controller('PollsCtrl', function ($scope, $state, $stateParams, Poll,Lecture, EditPoll, $mdMedia) {
    'use strict';

    var currentLectureId = $stateParams.lectureId;

    $scope.polls = Poll.api.query({lecture_id: currentLectureId});
    $scope.selected =  EditPoll.registerPoll($scope.polls.length ? $scope.polls[0]: {});

    $scope.select = function (poll) {
      $scope.selected = EditPoll.registerPoll(poll);
    };

    $scope.previewVisible = function (){
      return $mdMedia('gt-md') || $mdMedia('md');
    };

    $scope.addPoll = function () {
      $state.go('polls.details', {pollId: 'create'});
    };

    $scope.currentDate = function () {
      return Date.now();
    };

  });
