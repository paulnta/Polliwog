angular.module('polliwogApp')
  .controller('SpeakerCtrl', function ($scope, $state, socket, lodash, $stateParams, Lecture) {
    'use strict';
    $scope.lectures = Lecture.query();
    $scope.showCreateSessionDialog = function () {};

    socket.socket.on('lecture:save', function (lecture) {
      var index = lodash.findIndex($scope.lectures, {_id: lecture._id});
      if(index < 0){
        $scope.lectures.push(lecture);
      } else {
        $scope.lectures[index] = lecture;
      }
    });



  });
