/**
 * Created by paulnta on 12.12.15.
 */

angular.module('polliwogApp')
  .controller('SideNavCtrl', function ($scope, $mdDialog, $mdSidenav,$mdMedia, $stateParams, $state, $timeout, $log) {

    /**
     * Navigates to another lecture
     * @param lectureSlug
     */
    $scope.goTo = function (lectureSlug) {
      $state.go('lecture', {lectureSlug: lectureSlug});
      setTimeout(function () {
        $mdSidenav('left').close();
      }, 200);
    };

    $scope.isActivated = function (lectureSlug) {
      return $stateParams.lectureSlug === lectureSlug;
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
