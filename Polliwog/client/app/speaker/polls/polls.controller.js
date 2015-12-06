/**
 * Created by paulnta on 28.11.15.
 */

angular.module('polliwogApp')
  .controller('PollsCtrl', function ($scope, Poll, Lecture, $mdMedia) {
    'use strict';

    $scope.message = "PollsCtrl";

    $scope.polls = Poll.list(Lecture.current());
    $scope.selected = $scope.polls.length ? $scope.polls[0]: {};

    $scope.select = function (poll) {
      $scope.selected = poll;
    };

    $scope.previewVisible = function (){
      return $mdMedia('gt-md') || $mdMedia('md');
    }


  });
