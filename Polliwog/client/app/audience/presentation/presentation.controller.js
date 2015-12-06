'use strict';

angular.module('polliwogApp')
  .controller('PresentationCtrl', function ($scope, $stateParams) {
    $scope.message = 'Hello';
    $scope.code = $stateParams.lectureCode;
  });
