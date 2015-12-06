/**
 * Created by paulnta on 06.12.15.
 */

angular.module('polliwogApp')
  .controller('AddQuestionCtrl', function ($scope, EditPoll) {

    /*
     * Default question
     */
    $scope.question = {
      title: '',
      choices :[
        {title: 'Choice 1', state: false}
      ]
    };

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
    };
  });
