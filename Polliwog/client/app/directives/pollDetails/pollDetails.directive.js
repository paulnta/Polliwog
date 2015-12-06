'use strict';

angular.module('polliwogApp')
  .controller('EditPollCtrl', function ($scope, $mdDialog, EditPoll) {

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
          question: question
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

    $scope.editTitle = function (event, title) {
      $mdDialog.show({
        locals: {
          title: title
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

  })
  .directive('pollDetails', function () {
    return {
      templateUrl: 'app/directives/pollDetails/pollDetails.html',
      restrict: 'E', // only match element names : <poll-details></poll-details>
      scope: {
        poll : '=',
        mode: '@'
      },
      controller: 'EditPollCtrl',
      link: function (scope, element, attrs) {

        function previewHeight() {
          var windowH = $(window).height();
          var headerH = $('#navigation').height();
          if(!headerH) {
            headerH = 128;
          }
          var preview = $('.auto-height .wrapper');
          if(preview) {
            var newH = (windowH - headerH - 5);
            preview.css('height', newH + 'px');
          } else {
            console.log('element no found');
          }
        }
        setTimeout(previewHeight, 0);
        window.addEventListener("resize", previewHeight);
      }
    };
  });

