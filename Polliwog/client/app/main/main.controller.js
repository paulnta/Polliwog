'use strict';

angular.module('polliwogApp')

  /**
   *  MainCtrl defines general layout behaviors
   *  Manage navigation, screen size and other features that need to be available from anywhere
   */
  .controller('MainCtrl', function ($scope, $stateParams, Auth, $timeout, $mdSidenav, $mdDialog, $log, Lecture, $mdMedia) {



    /**
     * Define body behaviors
     * ==============================================
     */
    $scope.disableScrollOnBody = function () {
      angular.element('body').addClass('overflow-hidden');
    };

    $scope.enableScrollOnBody = function () {
      angular.element('body').removeClass('overflow-hidden');
    };


    /**
     * Define side navigation behaviors
     * ==============================================
     */

    // Side nav is locked open
    $scope.leftNavLocked = true;

    // return true if the side nav is visible and locked open
    $scope.hasSidenavLeft = function () {
      return $scope.leftNavLocked && $mdMedia('gt-md');
    };

    // lock or unlock the side nav
    $scope.toggleLockLeft = function () {
      $scope.leftNavLocked = !$scope.leftNavLocked;
      $mdSidenav('left').close();
    };

    // toggle the icon to lock or unlock the side nav
    $scope.pinIcon = function () {
      if($scope.leftNavLocked){
        return 'keyboard_arrow_left';
      }
      return 'keyboard_arrow_right';
    };

    $scope.isOpenLeft = function () {
      return $mdSidenav('left').isOpen();
    };


    /**
     * Define screen size for adaptive ui
     * ==============================================
     */
    $scope.isSmall = function () {
      return $mdMedia('sm') || $mdMedia('xs');    // small or extra small
    };

    $scope.isMedium = function () {
      return $mdMedia('md');                      // medium (tablet)
    };

    $scope.isLarge = function () {
      return $mdMedia('gt-md');                   // bigger than tablet (desktop, tv, etc..)
    };

    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    /**
     * Show a dialog to create a new lecture.
     */
    $scope.showCreateLectureDialog = function (event, lecture) {

      $mdDialog.show({
        locals : {
          lecture : lecture
        },
        controller: 'AddLectureCtrl',
        templateUrl: 'components/speaker/dialog-add-lecture/dialog-add-lecture.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: false,
        fullscreen: $mdMedia('xs')
      });
    };
  });
