/**
 * Created by paulnta on 12.12.15.
 */

angular.module('polliwogApp')
  .controller('SideNavCtrl', function ($scope, $mdSidenav, $stateParams, $state, $timeout) {

    /**
     * Navigates to another lecture
     * @param lectureId
     */
    $scope.goTo = function (lectureId) {
      $state.go('lecture', {lectureId: lectureId});
      setTimeout(function () {
        $mdSidenav('left').close();
      }, 200);
    };

    $scope.isActivated = function (lectureId) {
      return $stateParams.lectureId === lectureId;
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
      }, 200);
    }

    $scope.toggleLeft = buildDelayedToggler('left');

  });
