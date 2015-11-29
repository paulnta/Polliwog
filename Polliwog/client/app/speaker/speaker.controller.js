angular.module('polliwogApp')
  .controller('SpeakerCtrl', function ($scope, $state) {
    $scope.message = "SpeakerCtrl";
    $scope.sessions = [
      {
        title: "Session 1",
        id: 1
      },
      {
        title: "session 2",
        id: 2
      },
      {
        title: "session 3",
        id: 3
      }
    ];

    $scope.goTo = function (sessionId) {
      $state.go('session', {sessionId: sessionId});
    };

    $scope.currentSession = function () {
      return $state.params.sessionId;
    };
  });
