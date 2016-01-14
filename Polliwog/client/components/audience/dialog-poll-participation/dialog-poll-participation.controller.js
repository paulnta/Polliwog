/**
 * Created by paulnta on 14.01.16.
 */

angular.module('polliwogApp')
  .controller('PollParticipationCtrl', function ($scope, poll) {
    $scope.poll = poll;
  });
