angular.module('polliwogApp')
  .controller('SpeakerCtrl', function ($scope, $state) {
    $scope.message = "SpeakerCtrl";

    // TODO: Get session through API
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

    /**
     * Navigates to another session
     * @param sessionId
     */
    $scope.goTo = function (sessionId) {
      $state.go('session', {sessionId: sessionId});
    };

    /**
     * Get the currentSession id
     * @returns sessionId
     */
    $scope.currentSession = function () {
      return $state.params.sessionId;
    };
  });
