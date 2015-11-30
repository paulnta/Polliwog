angular.module('polliwogApp')
  .controller('SpeakerCtrl', function ($scope, $state, Session) {
    'use strict';

    $scope.message = "SpeakerCtrl";

    // TODO: Get session through API
    $scope.sessions = Session.list();

    $scope.currentTab = function () {
      if($state.includes('questions')){
        return 'active3';

      } else if ($state.includes('polls')){
        return 'active2';

      } else if ($state.includes('session')){
        return 'active1';
      }
    };

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
