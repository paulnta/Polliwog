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
    //TODO: enlever cette fonction. Elle a été créee dans le but de contourner le problème du menu sur un poll qui ne marche pas.
    $scope.startPoll = function() {
      console.log('speaker started poll : ' + $scope.poll._id + ' lecture : ' + $scope.poll.lecture);
      socket.socket.emit('poll:start', {poll:$scope.poll, key: $scope.poll.lecture});
    };
  });

