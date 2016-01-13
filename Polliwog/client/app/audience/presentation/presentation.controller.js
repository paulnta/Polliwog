'use strict';

angular.module('polliwogApp')
  .controller('PresentationCtrl', function ($scope, socket, $stateParams, $log) {
    $scope.message = 'Hello';
    $scope.code = $stateParams.lectureCode;

    socket.socket.emit('lecture:join', $scope.code);
    socket.socket.on('lecture:join', function (data) {
      $log.debug('[SOCKET] Join successful : '+ JSON.stringify(data));
    });

    socket.socket.on('lecture:pollStartNotification', function (data) {
      $log.debug('[SOCKET] Notification - a new poll : ' + data);
    });

    $scope.test = function () {
      var data = {
        key: $scope.code,
        pollId: $scope.poll.id,
        answers: "poll's answers here",
        msg: 'Submit poll answers. [Lecture key : ' + $scope.code + ', Poll id : ' + $scope.poll.id + ']'
      };
      socket.socket.emit('lecture:vote', data);
    }

  });
