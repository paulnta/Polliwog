angular.module('polliwogApp')
  .controller('SpeakerCtrl', function ($scope, $state, Session, Mood, $mdSidenav, User) {
    'use strict';

    // trick: loggedUser have access to this ressource
    //$scope.users = User.query();

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
      setTimeout(function () {
        $mdSidenav('left').close();
      }, 200);
    };

    /**
     * Get the currentSession id
     * @returns sessionId
     */
    $scope.currentSession = function () {
      return Session.current();
    };

  });
