/**
 * Created by paulnta on 04.12.15.
 */
angular.module('polliwogApp')
  .controller('QuickPollCtrl', function ($scope, $mdDialog, $mdMedia) {

    $scope.showSelectType = function (event) {
      $mdDialog.show({
        controller: function ($scope, $mdDialog) {
        },
        templateUrl: 'components/speaker/quick-poll/template-dialog.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: $mdMedia('sm')
      })
      .then(function () {
          console.log('showSelectType finished');
      });
    }
  });
