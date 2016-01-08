'use strict';

angular.module('polliwogApp')
  .controller('PresentationCtrl', function ($scope, socket, $stateParams, $log) {
    $scope.message = 'Hello';
    $scope.code = $stateParams.lectureCode;

    socket.socket.emit('lecture:join', $scope.code);
    socket.socket.on('lecture:join', function (data) {
      $log.debug(data);
    });

    socket.socket.on('lecture:broadcast', function (data) {
      $log.debug(data);
    });

    $scope.test = function () {
      var data = {
        key: $scope.code,
        msg: 'TEST FROM ' + $scope.code
      };
      socket.socket.emit('lecture:broadcast', data);
    }

  });
