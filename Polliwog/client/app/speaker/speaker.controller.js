angular.module('polliwogApp')
  .controller('SpeakerCtrl', function ($scope, $state, Session) {
    $scope.message = "SpeakerCtrl";

    // TODO: Get session through API
    $scope.sessions = Session.list();

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
      return Session.current();
    };
  });
