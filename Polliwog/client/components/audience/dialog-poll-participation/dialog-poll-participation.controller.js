/**
 * Created by paulnta on 14.01.16.
 */

angular.module('polliwogApp')
  .controller('PollParticipationCtrl', function ($scope, $log, $mdToast, poll, lectureCode, $mdDialog,enableMode, socket) {

    $scope.poll = poll;
    $scope.lectureCode = lectureCode;
    $scope.enableMode = enableMode;
    $scope.messagePollClosed = 'The poll has been closed by the speaker but you can see statistics!';

    $scope.showInfos = function (message) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .action('OK')
          .hideDelay(10000)
          .highlightAction(false)
          .position('top'));
    };

    //socket.socket.on('poll:stop', function (poll) {
    //  $scope.showInfos($scope.messagePollClosed);
    //});

    if(!enableMode){
      setTimeout(
        function () {
          $scope.showInfos($scope.messagePollClosed);
      },400);
    }

    /**
     * Handles choice change
     * @param choice clicked by the user
     * @param question
     */
    $scope.onChoiceChanged = function (choice, question) {
      console.log(choice.state + ' code: ' + $scope.lectureCode);
      socket.socket.emit('poll:vote', {
        key: $scope.lectureCode,
        question: question._id,
        choice: choice._id,
        state: choice.state
      })
    };



    $scope.close = function () {
      $mdDialog.hide();
    };

  });
