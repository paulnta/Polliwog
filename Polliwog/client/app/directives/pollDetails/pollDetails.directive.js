'use strict';

angular.module('polliwogApp')
  .controller('EditPollCtrl', function ($scope, $mdDialog, EditPoll) {

    $scope.toolbarOpen = false;
    //EditPoll.registerObserverCallback(function () {
    //  console.log('EditPoll changed');
    //});

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
      })
      .then(function () {
        console.log('showSelectType finished');
      });
    };

    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    /**
     * Show a dialog to add a new question
     * @param event
     */
    $scope.showDialogAddQuestion = function (event) {
        $scope.showDialogEditQuestion(event, {
          title: '',
          choices :[
            {title: 'Choice 1', state: false}
          ]
        })
    };

  })
  .directive('pollDetails', function () {
    return {
      templateUrl: 'app/directives/pollDetails/pollDetails.html',
      restrict: 'E', // only match element names : <poll-details></poll-details>
      scope: {
        poll : '='
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
