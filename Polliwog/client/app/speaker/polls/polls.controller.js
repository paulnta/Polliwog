/**
 * Created by paulnta on 28.11.15.
 */

angular.module('polliwogApp')
  .controller('PollsCtrl', function ($scope, $state, $stateParams, Poll,Lecture, EditPoll, $mdMedia, CurrentLecture) {
    'use strict';

    // wait for currentLecture resolved
    CurrentLecture.$promise.then(function () {
      // get currentLecture's polls
      $scope.polls = Poll.query({lectureId: CurrentLecture._id});

      // wait for polls resolved and set selected poll
      $scope.polls.$promise.then(function () {
        $scope.selected =  EditPoll.registerPoll($scope.polls.length ? $scope.polls[0]: {});
      });
    });

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
