'use strict';

angular.module('polliwogApp')
  .controller('PresentationCtrl', function ($scope, socket, $mdToast, lodash, $stateParams, $mdDialog, $mdMedia) {
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


    $scope.showNewPollToast = function (poll) {
      $mdToast.show(
        $mdToast.simple()
          .textContent('A new poll has arrived. You should participate')
          .action('Participate')
          .hideDelay(5000)
          .highlightAction(false)
          .position('top')
      ).then(function(response){
          if(response == 'ok'){
            $scope.showPoll(null, poll, true);
          }
      })
    };

    /**
     * Receive a poll from the speaker
     */
    socket.socket.on('poll:start', function (poll) {
      var idx = lodash.findIndex($scope.polls, {_id: poll._id});
      if(idx < 0)
        $scope.polls.push(poll);
      else
        $scope.polls[idx] = poll;

      $scope.showNewPollToast(poll);
    });

    socket.socket.on('poll:stop', function (poll) {
      var pollIndex = lodash.findIndex($scope.polls, {_id: poll._id});
      if(pollIndex < 0) return;
      $scope.polls[pollIndex].state = 'closed';
    });

    /**
     * Shows a dialog to participate to a poll
     * @param event
     * @param poll
     */
    $scope.showPoll = function (event, poll, enableMode) {
      //enableMode = enableMode || false;
      $mdDialog.show({
        locals: {
          poll: poll,   // params to pass to the dialog controller
          lectureCode: $scope.code,
          enableMode: enableMode
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
