'use strict';

angular.module('polliwogApp')
  .controller('PollsDetailsCtrl', function ($scope, $stateParams, EditPoll, Poll, CurrentLecture) {

    //TODO: make this code cleaner (create as param ?)
    if($stateParams.pollId === 'create'){
      $scope.poll = EditPoll.create();

    } else {
      // get poll
      CurrentLecture.$promise.then(function () {
        $scope.poll = EditPoll.registerPoll(Poll.get({lectureId: CurrentLecture._id, pollId: $stateParams.pollId}));
      });
    }
  });

