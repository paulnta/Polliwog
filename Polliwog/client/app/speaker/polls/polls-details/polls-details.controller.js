'use strict';

angular.module('polliwogApp')
  .controller('PollsDetailsCtrl', function ($scope, socket, $stateParams, EditPoll, Poll, CurrentLecture) {

    $scope.isNew = false;
    //TODO: make this code cleaner (create as param ?)
    if($stateParams.pollId === 'create'){
      $scope.poll = EditPoll.create();
      $scope.isNew = true;

    } else {
      // get poll
      CurrentLecture.$promise.then(function () {
        $scope.poll = EditPoll.registerPoll(Poll.get({lectureId: CurrentLecture._id, pollId: $stateParams.pollId}));
      });
    }

    socket.socket.emit('info', 'test form client');

    $scope.startPoll = function() {
      console.log('speaker started poll : ' + $scope.poll._id + ' lecture : ' + $scope.poll.lecture);
      socket.socket.emit('lecture:pollStart', $scope.poll);
    };

    socket.socket.on('lecture:pollResultsUpdated', function (data) {
      console.log('poll answers received : ' + data);
    });

  });

