'use strict';

angular.module('polliwogApp')
  .controller('PresentationCtrl', function ($scope, socket, $stateParams, Poll, $mdDialog, $mdMedia, $log) {
    $scope.code = $stateParams.lectureCode;
    $scope.polls = [];
    $scope.lecture = {};

    /**
     * Join the lecture
     * Get activated polls
     */
    socket.socket.emit('lecture:join', $scope.code);
    socket.socket.on('lecture:join', function (data) {
      $scope.polls = data.polls;
      $scope.lecture = data.lecture;
    });

    /**
     * Receive a poll from the speaker
     */
    socket.socket.on('poll:start', function (poll) {
      $scope.polls.push(poll);
    });


    /**
     * Shows a dialog to participate to a poll
     * @param event
     * @param poll
     */
    $scope.showPoll = function (event, poll) {
      $mdDialog.show({
        locals: {
          poll: poll,   // params to pass to the dialog controller
          lectureCode: $scope.code
        },
        controller: 'PollParticipationCtrl',
        templateUrl: 'components/audience/dialog-poll-participation/dialog-poll-participation.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: false,
        fullscreen: $mdMedia('xs')
      });
    };

  });
