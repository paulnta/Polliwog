/**
 * Created by paulnta on 07.01.16.
 */


angular.module('polliwogApp')
  .controller('toolbarLectureCtrl', function ($scope, Lecture, $mdDialog, $mdMedia, CurrentLecture, $stateParams, $state) {
    'use strict';

    $scope.currentLecture = CurrentLecture;

    /**
     * Current active tab
     * TODO: Make this code more generic
     * @returns {string}
     */
    $scope.currentTab = function () {
      if($state.includes('questions')){
        return 'active3';

      } else if ($state.includes('polls')){
        return 'active2';

      } else if ($state.includes('lecture')){
        return 'active1';
      }
    };

    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.editLecture = function () {

        $mdDialog.show({
          locals : {
            lecture : CurrentLecture
          },
          controller: 'AddLectureCtrl',
          templateUrl: 'components/speaker/dialog-add-lecture/dialog-add-lecture.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: false,
          fullscreen: $mdMedia('xs')
        });
    };

    $scope.share = function () {
        $mdDialog.show({
          locals: {
            lecture: CurrentLecture
          },
          controller: 'DialogShareLectureCtrl',
          templateUrl: 'components/speaker/dialog-share-lecture/dialog-share-lecture.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          fullscreen: true
        })
    };

    $scope.deleteLecture = function () {

    };


  });
