/**
 * Created by paulnta on 28.11.15.
 */

angular.module('polliwogApp')
  .controller('PollsCtrl', function ($scope, $state, socket, $stateParams, Poll, lodash,
                                     Lecture, EditPoll, $mdMedia, CurrentLecture, $log) {
    'use strict';

    // wait for currentLecture resolved
    CurrentLecture.$promise.then(function (lecture) {
      // get currentLecture's polls
      $scope.currentLecture = lecture;
        $scope.polls = Poll.query({lectureId: lecture._id});
      // wait for polls resolved and set selected poll
      $scope.polls.$promise.then(function () {
        $scope.selected =  EditPoll.registerPoll($scope.polls.length ? $scope.polls[0]: {});
      });
    });

    /**
     * Get audience updates
     * TODO: user poll:updated to update the chart when someone votes
     */
    socket.socket.on('poll:updated', function (data) {
      var pollIndex = lodash.findIndex($scope.polls, {'_id': data.pollId});
      if(pollIndex < 0) return;
      var questionIndex = lodash.findIndex($scope.polls[pollIndex].questions, {'_id': data.question._id});
      if(questionIndex < 0) return;
        $scope.polls[pollIndex].questions[questionIndex] = data.question;
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

    $scope.delete = function (poll) {
      var index = $scope.polls.indexOf(poll);
      console.log({willDelete: poll});
      Poll.delete({lectureId: CurrentLecture._id}, poll, function (doc) {
        $scope.polls.splice(index, 1);
        var newIndex = index < $scope.polls.length ? index : index -1;
        $scope.selected = EditPoll.registerPoll(newIndex < 0 ? {} : $scope.polls[newIndex]);
        $log.debug({deleted: doc});
      });
    };

  });
