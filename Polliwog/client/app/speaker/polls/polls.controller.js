/**
 * Created by paulnta on 28.11.15.
 */

angular.module('polliwogApp')
  .controller('PollsCtrl', function ($scope, $state, socket, $stateParams, Poll, lodash,
                                     Lecture, EditPoll, $mdMedia, CurrentLecture, $log) {
    'use strict';

    var previewEnabled = true;

    // wait for currentLecture resolved
    CurrentLecture.$promise.then(function (lecture) {
      // get currentLecture's polls
      $scope.currentLecture = lecture;
      socket.socket.emit('lecture:speakerConnect', lecture.key);
        $scope.polls = Poll.query({lectureId: lecture._id});
      // wait for polls resolved and set selected poll

      $scope.polls.$promise.then(function () {
        $scope.selected =  EditPoll.registerPoll($scope.polls.length ? $scope.polls[0]: {});
      });
    });

    /**
     * Get audience updates
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
      previewEnabled = true;
    };

    $scope.previewVisible = function (){
      return previewEnabled && ($mdMedia('gt-md') || $mdMedia('md'));
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

    $scope.resetSatistics = function (poll) {
      angular.forEach(poll.questions, function (question) {
        angular.forEach(question.choices, function (choice) {
          choice.answer_count = 0;
        });
      });
    };

    $scope.getClassState = function (poll) {
      return poll.state;
    };

  });
