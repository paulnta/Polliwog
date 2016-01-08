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

  });

