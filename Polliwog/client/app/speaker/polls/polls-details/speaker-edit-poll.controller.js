/**
 * Created by paulnta on 21.01.16.
 */


angular.module('polliwogApp')
  .controller('SpeakerEditPollCtrl', function ($scope, EditPoll) {

    $scope.poll = EditPoll.getRegisteredPoll();

    /**
     * Remove a question
     * @param question
     */
    $scope.removeQuestion = function (question) {
      EditPoll.removeQuestion(question);
    };

  });
