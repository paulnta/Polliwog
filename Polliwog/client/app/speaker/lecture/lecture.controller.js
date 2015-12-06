/**
 * Created by paulnta on 28.11.15.
 */

angular.module('polliwogApp')
  .controller('LectureCtrl', function ($scope) {
    $scope.message = "LectureCtrl";
    $scope.dialOpen = false;
    $scope.toggleDial = function () {
      $scope.dialOpen = !$scope.dialOpen;
    };


  });
