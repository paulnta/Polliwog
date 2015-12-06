/**
 * Created by paulnta on 06.12.15.
 */

angular.module('polliwogApp')
  .controller('AddQuestionCtrl', function ($scope, EditPoll, $mdDialog, question) {

    /*
     * Default question
     */
    $scope.question = question;

    /*
     * Add a choice to the current question
     */
    $scope.addChoice = function () {
      $scope.question.choices.push({title: 'Choice' + $scope.question.choices.length, state: false});
    };

    /*
     * Add question to the EditPoll factory
     */
    $scope.save = function () {
      EditPoll.addQuestion($scope.question);
      $mdDialog.hide();
    };
  });
