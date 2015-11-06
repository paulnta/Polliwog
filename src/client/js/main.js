angular.module('myApp', [])
  .controller('pollsCtrl', function ($scope, $http) {

      $scope.poll_count = 76;
      $scope.active_count = 76;

      $http.get('/api/polls').success(function (polls) {
        $scope.poll_count = polls.length;
        $scope.active_count =  polls.filter(function (x) { return x.active; }).length;
      });

  });
