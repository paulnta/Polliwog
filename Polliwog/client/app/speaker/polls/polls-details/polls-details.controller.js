

angular.module('polliwogApp')
  .controller('PollsDetailsCtrl', function ($scope, $stateParams, Poll) {
    $scope.message = "PollsDetailsCtrl";
    $scope.pollId = $stateParams.id;

    $scope.poll = Poll.get($scope.pollId);
  });
