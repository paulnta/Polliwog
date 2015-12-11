'use strict';

angular.module('polliwogApp')


  /**
   *  MainCtrl defines general layout behaviors
   *  Manage navigation, screen size and other features that need to be available from anywhere
   */
  .controller('MainCtrl', function ($scope, Auth, $timeout, $mdSidenav, $mdDialog, $log, Lecture, $mdMedia) {

    $scope.leftNavLocked = true;

    $scope.toggleLockLeft = function () {
      $scope.leftNavLocked = !$scope.leftNavLocked;
      $mdSidenav('left').close();
    };

    $scope.hasSidenavLeft = function () {
      return $scope.leftNavLocked && $mdMedia('gt-md');
    };

    $scope.pinIcon = function () {
      if($scope.leftNavLocked){
        return 'keyboard_arrow_left';
      }
      return 'keyboard_arrow_right';
    };


    $scope.disableScrollOnBody = function () {
      angular.element('body').addClass('overflow-hidden');
    };

    $scope.enableScrollOnBody = function () {
      angular.element('body').removeClass('overflow-hidden');
    };

    $scope.isOpenLeft = function () {
      return $mdSidenav('left').isOpen();
    };

    $scope.getTitle = function () {
      return Lecture.current().name;
    };

    $scope.isActivated = function (lectureId) {
      return Lecture.current()._id === lectureId;
    };

    /**
     * Define screen size for adaptive ui
     * @returns {*}
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


    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait) {
      var timer;
      return function debounced() {
        var context = $scope,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug('toggle ' + navID + ' is done');
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug('toggle ' + navID + ' is done');
          });
      };
    }

    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');

    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
  })

  /**
   *  Controller for left navigation
   */
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug('close LEFT is done');
        });
    };
  });
