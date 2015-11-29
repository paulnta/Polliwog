

angular.module('polliwogApp')
  .controller('PollsPreviewCtrl', function ($scope, $stateParams) {
    $scope.message = "PollsPreviewCtrl";
    $scope.pollId = $stateParams.id;
  });
