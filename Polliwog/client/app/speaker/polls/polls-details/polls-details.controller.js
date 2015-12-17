'use strict';

angular.module('polliwogApp')
  .controller('PollsDetailsCtrl', function ($scope, $stateParams, $mdDialog, $mdMedia, EditPoll, Poll) {

    // poll id in url params
    $scope.pollId = $stateParams.pollId;

    //TODO: make this code cleaner (create as param ?)
    if($scope.pollId === 'create'){
      $scope.poll = EditPoll.create();

    } else {
      // get poll
      $scope.poll = EditPoll.registerPoll(Poll.get($scope.pollId));
      console.log($scope.poll);
    }
  });

