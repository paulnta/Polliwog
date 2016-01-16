'use strict';

angular.module('polliwogApp')
  .controller('JoinCtrl', function ($scope, Lecture, lodash, $state) {
    $scope.inputCode = "";

    $scope.join = function () {
      Lecture.query().$promise.then(function (lectures) {
        var lecture = lodash.find(lectures, {key: $scope.inputCode});

        if(lecture)
          $state.go('audienceLecture', {lectureCode: $scope.inputCode});
      });
    };

  });
