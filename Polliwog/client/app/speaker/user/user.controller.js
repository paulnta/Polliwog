/**
 * Created by paulnta on 01.12.15.
 */


angular.module('polliwogApp')
  .controller('UserCtrl', function ($scope, Auth, $location) {

    $scope.currentUser = Auth.getCurrentUser();

    $scope.currentUserName = function () {
      return $scope.currentUser.name;
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };
  });
