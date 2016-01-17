'use strict';

angular.module('polliwogApp')
  .controller('PresentationCtrl', function ($scope, socket, $stateParams, Poll, $mdDialog, $mdMedia, $log) {
    $scope.message = 'Hello';
    $scope.code = $stateParams.lectureCode;


    socket.socket.emit('lecture:join', $scope.code);
    socket.socket.on('lecture:join', function (data) {
      $log.debug('[SOCKET] Join successful : ' + JSON.stringify(data));
    });

    socket.socket.on('poll:start', function (data) {
      $scope.showPoll(null, data);
    });

    $scope.onChoiceChanged = function (choice) {
      $log.debug(choice);
    };


    //socket.socket.on('lecture:pollStartNotification', function (data) {
    //  $log.debug('[SOCKET] Notification - a new poll : ' + data);
    //});

    // TODO: add doc
    $scope.vote = function () {
      var results = [];
      results['title'] = '1';
      var data = {
        lectureId: $scope.code,
        pollId: $scope.poll.id,
        results: results
      };
      socket.socket.emit('poll:vote', data);
      $log.debug(data);
    };

    /**
     * Shows a dialog to participate to a poll
     * @param event
     * @param poll
     */
    $scope.showPoll = function (event, poll) {
      $mdDialog.show({
        locals: {
          poll: poll    // params to pass to the dialog controller
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
