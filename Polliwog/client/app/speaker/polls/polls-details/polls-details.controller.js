

angular.module('polliwogApp')
  .controller('PollsDetailsCtrl', function ($scope, $stateParams, $mdDialog, $mdMedia, EditPoll, Poll) {

    // poll id in url params
    $scope.pollId = $stateParams.pollId;

    if($scope.pollId === "create"){
      $scope.poll = EditPoll.create();

    } else {
      // get poll
      $scope.poll = Poll.get($scope.pollId);
      EditPoll.registerPoll($scope.poll);
    }
  });

