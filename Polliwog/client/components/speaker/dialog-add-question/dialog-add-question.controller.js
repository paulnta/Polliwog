/**
 * Created by paulnta on 06.12.15.
 */

angular.module('polliwogApp')
  .controller('AddQuestionCtrl', function ($document, $scope, EditPoll, $mdDialog, question) {

    /*
     * Default question
     */
    $scope.question = question;

    /*
     * Add a choice to the current question
     */
    $scope.addChoice = function () {
      $scope.question.choices.push({placeholder: 'Choice ' + ($scope.question.choices.length + 1), state: false, key: 'X'});
    };

    $scope.removeChoice = function (choice) {
      var index = $scope.question.choices.indexOf(choice);
      $scope.question.choices.splice(index, 1);
    };

    /*
     * Add question to the EditPoll factory
     */
    $scope.save = function () {
      EditPoll.saveQuestion($scope.question);
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };
  });
