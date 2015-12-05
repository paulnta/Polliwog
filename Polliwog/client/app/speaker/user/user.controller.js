/**
 * Created by paulnta on 01.12.15.
 */


angular.module('polliwogApp')
  .controller('UserCtrl', function ($scope, Auth, $location, User) {

    // trick to protect page by auth
    // because this query is protected to authenticated users
    //User.query();

    $scope.currentUser = Auth.getCurrentUser();

    $scope.currentUserName = function () {
      return $scope.currentUser.name;
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };
  });
