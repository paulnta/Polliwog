/**
 * Created by paulnta on 12.12.15.
 */

angular.module('polliwogApp')
  .controller('SideNavCtrl', function ($scope, $mdDialog, $mdSidenav, $stateParams, $state, $timeout, $log) {

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
          .then(function () {
            $log.debug('toggle ' + navID + ' is done');
          });
      }, 200);
    }
    /**
     * Show a dialog to create a new lecture.
     */
    $scope.showCreateLectureDialog = function (event) {
      /*$mdDialog.show({
        locals: {},
        controller: 'AddLectureCtrl',
        templateUrl: 'components/speaker/dialog-add-lecture/dialog-add-lecture.html',
        parent: angular.element(document.body),
        clickOutsideToClose: false
      });*/
      $mdDialog.show({
        controller: 'AddLectureCtrl',
        templateUrl: 'components/speaker/dialog-add-lecture/dialog-add-lecture.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: false
      });
    }

    $scope.toggleLeft = buildDelayedToggler('left');

  });
