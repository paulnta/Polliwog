

angular.module('polliwogApp')
  .controller('PollsDetailsCtrl', function ($scope, $stateParams) {
    $scope.message = "PollsDetailsCtrl";
    $scope.pollId = $stateParams.id;
  });
