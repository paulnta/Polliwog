/**
 * Created by paulnta on 28.11.15.
 */

angular.module('polliwogApp')
  .controller('PollsCtrl', function ($scope, Poll, Session) {
    'use strict';

    $scope.message = "PollsCtrl";

    $scope.polls = Poll.list(Session.current());
    $scope.selected = $scope.polls.length ? $scope.polls[0]: {};

    $scope.select = function (poll) {
      $scope.selected = poll;
    }

  });
