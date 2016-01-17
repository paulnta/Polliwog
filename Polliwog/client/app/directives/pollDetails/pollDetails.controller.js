/**
 * Created by paulnta on 10.12.15.
 */
'use strict';

angular.module('polliwogApp')
  .controller('EditPollCtrl', function ($scope, $mdDialog, $log, EditPoll, $mdMedia) {



    var backgrounds = [
      '/assets/images/back00.jpg',
      '/assets/images/back01.jpg',
      '/assets/images/back02.jpg',
      '/assets/images/back03.jpg'
    ];

    function getDefaultBackImage(){
      return backgrounds[Math.floor(Math.random()* backgrounds.length)];
    }

    $scope.defaultImage = getDefaultBackImage();

    $scope.toolbarOpen = false;

    $scope.openToolbar = function () {
      $scope.toolbarOpen = true;
    };

    $scope.closeToolbar = function () {
      $scope.toolbarOpen = false;
    };


    $scope.labels = ['choice 1', 'choice 2', 'choice 3', 'choice 4'];
    $scope.series = ['Series A'];

    //$scope.data = [
    //  [65, 59, 80, 81, 56, 55, 40],
    //  [28, 48, 40, 19, 86, 27, 90]
    //];
    $scope.data = [[65, 59, 80, 81]];

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
        clickOutsideToClose: false,
        fullscreen: $mdMedia('xs')
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
          {title: '', placeholder: 'choice 1', key: 'A', state: false}
        ]
      });
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
        clickOutsideToClose: false,
        fullscreen: $mdMedia('xs')
      });
    };

    if($scope.new){
      $scope.editTitle(null, $scope.poll.title);
    }

    $scope.editImage = function (event) {
      angular.noop(event);
    };

    /**
     * Remove a question
     * @param question
     */
    $scope.removeQuestion = function (question) {
      EditPoll.removeQuestion(question);
    };

    $scope.choiceChanged = function (choice, question) {
      setTimeout(function () {
        $scope.onChoiceChanged()(choice, question);
      }, 0);
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
