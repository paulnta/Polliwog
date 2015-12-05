/**
 * Created by paulnta on 28.11.15.
 */

angular.module('polliwogApp')
  .controller('SessionCtrl', function ($scope) {
    $scope.message = "SessionCtrl";
    $scope.dialOpen = false;
    $scope.toggleDial = function () {
      $scope.dialOpen = !$scope.dialOpen;
    };


  });
