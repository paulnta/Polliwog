'use strict';

angular.module('polliwogApp')
  .controller('MainCtrl', function ($scope, Auth, $timeout, $mdSidenav, $mdDialog, $log) {

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


    $scope.message = 'Sweet home';

    $scope.data = {
      selectedIndex: 0,
      secondLocked:  true,
      secondLabel:   'Item Two',
      bottom:        false
    };
    $scope.next = function() {
      $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
    };
    $scope.previous = function() {
      $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };

    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };


    $scope.navigateTo = function(to, event) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('Navigating')
          .textContent('Imagine being taken to ' + to)
          .ariaLabel('Navigation demo')
          .ok('Neat!')
          .targetEvent(event)
      );
    };
  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug('close LEFT is done');
        });
    };
  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug('close RIGHT is done');
        });
    };
  });
