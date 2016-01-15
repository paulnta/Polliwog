/**
 * Created by paulnta on 14.01.16.
 */

angular.module('polliwogApp')
  .controller('PollParticipationCtrl', function ($scope, $log, poll) {

    $scope.poll = poll;

    /**
     * Handles choice change
     * @param choice clicked by the user
       */
    $scope.onChoiceChanged = function (choice) {
      console.log(choice);
    };
  });
