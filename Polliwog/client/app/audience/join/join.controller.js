'use strict';

angular.module('polliwogApp')
  .controller('JoinCtrl', function ($scope, Lecture, socket, lodash, $state) {
    $scope.inputCode = "";

    $scope.join = function (form) {
      if(form.$valid)
        $scope.checkLectureCode();
    };

    $scope.checkLectureCode = function () {
      socket.socket.emit('lecture:checkCode', $scope.inputCode);
    };

    socket.socket.on('lecture:codeValid', function (code) {
      $state.go('audienceLecture', {lectureCode: code});
    });

    socket.socket.on('lecture:errorCode', function (code) {
      $scope.errorCode = true;
    });

  });
