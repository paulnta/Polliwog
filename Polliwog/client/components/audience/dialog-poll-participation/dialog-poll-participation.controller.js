/**
 * Created by paulnta on 14.01.16.
 */

angular.module('polliwogApp')
  .controller('PollParticipationCtrl', function ($scope, $log, poll, lectureCode, $mdDialog, socket) {

    $scope.poll = poll;
    $scope.lectureCode = lectureCode;

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
