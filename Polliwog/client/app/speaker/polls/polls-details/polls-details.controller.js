'use strict';

angular.module('polliwogApp')
  .controller('PollsDetailsCtrl', function ($scope, lodash, socket, $stateParams, EditPoll, Poll, CurrentLecture) {

    CurrentLecture.$promise.then(function (lecture) {
      socket.socket.emit('lecture:speakerConnect', lecture.key);
    });

    $scope.isNew = false;
    if($stateParams.pollId === 'create'){
      $scope.poll = EditPoll.create();
      $scope.isNew = true;

    } else {
      // get poll
      CurrentLecture.$promise.then(function () {
        $scope.poll = EditPoll.registerPoll(Poll.get({lectureId: CurrentLecture._id, pollId: $stateParams.pollId}));
      });
    }

    socket.socket.on('poll:updated', function (data) {
      console.log('poll:update');

      if(data.pollId == $scope.poll._id){

        var questionIndex = lodash.findIndex($scope.poll.questions, {'_id': data.question._id});
        if(questionIndex < 0) return;

        $scope.poll.questions[questionIndex] = data.question;
      }

    });

  });
