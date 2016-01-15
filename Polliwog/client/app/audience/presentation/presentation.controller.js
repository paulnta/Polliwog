'use strict';

angular.module('polliwogApp')
  .controller('PresentationCtrl', function ($scope, socket, $stateParams, Poll, $mdDialog, $mdMedia, $log) {
    $scope.message = 'Hello';
    $scope.code = $stateParams.lectureCode;

    //debug
    Poll.query({lectureId: '568f27e5ea14b8bccf8a4b43'}).$promise.then(function (polls) {
      $scope.showPoll(null, polls[0]);
    });


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

    // TODO: test ?
    //$scope.test = function () {
    //  var data = {
    //    key: $scope.code,
    //    pollId: $scope.poll.id,

        /* TODO: pourquoi passer: answer et msg ?
           il suffit de passer l'id de choix, le serveur ajoutera alors le nombre de réponse pour ce choix.
         **/
    //    answers: "poll's answers here",
    //    msg: 'Submit poll answers. [Lecture key : ' + $scope.code + ', Poll id : ' + $scope.poll.id + ']'
    //  };

    // TODO: Pourquoi le nom de l'événement est : lecture:vote , on vote pour un poll non ?
    //  socket.socket.emit('lecture:vote', data);
    //};

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
