/**
 * Created by paulnta on 06.12.15.
 */

angular.module('polliwogApp')
  .controller('EditTitleCtrl', function ($document, $scope, EditPoll, $mdDialog, title) {

    /*
     * Default question
     */
    $scope.title = title;


    /*
     * Add question to the EditPoll factory
     */
    $scope.save = function () {
      EditPoll.saveTitle($scope.title);
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.hide('cancel');
    };
  });
