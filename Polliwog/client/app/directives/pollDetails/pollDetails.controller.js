/**
 * Created by paulnta on 10.12.15.
 */

angular.module('polliwogApp')
  .controller('EditPollCtrl', function ($scope, $mdDialog, EditPoll, Poll) {

    $scope.defaultImage = Poll.getDefaultBackImage();
    $scope.toolbarOpen = true;

    $scope.openToolbar = function () {
      $scope.toolbarOpen = true;
    };

    $scope.closeToolbar = function () {
      $scope.toolbarOpen = false;
    };
    /**
     * Shows a dialog to edit a question
     * @param event
     * @param question
     */
    $scope.showDialogEditQuestion = function (event, question) {
      $mdDialog.show({
        locals: {
          question: question    // params to pass to the dialog controller
        },
        controller: 'AddQuestionCtrl',
        templateUrl: 'components/speaker/dialog-add-question/dialog-add-question.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: false
      });
    };

    /**
     * Show a dialog to add a new question
     * @param event
     */
    $scope.showDialogAddQuestion = function (event) {
      $scope.showDialogEditQuestion(event, {
        title: '',
        choices :[
          {title: '', placeholder: 'choice 1', state: false}
        ]
      })
    };

    /**
     * Show a dialog to edit a poll title
     * @param event
     * @param title
     */
    $scope.editTitle = function (event, title) {
      $mdDialog.show({
        locals: {
          title: title  // params to pass to the dialog controller
        },
        controller: 'EditTitleCtrl',
        templateUrl: 'components/speaker/dialog-edit-title/dialog-edit-title.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: false
      });
    };

    $scope.editImage = function (event) {

    };

    /**
     * Remove a question
     * @param question
     */
    $scope.removeQuestion = function (question) {
      EditPoll.removeQuestion(question);
    };

    /**
     * Open a context menu
     */
    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

  });