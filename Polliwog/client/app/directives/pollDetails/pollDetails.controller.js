/**
 * Created by paulnta on 10.12.15.
 */
'use strict';

angular.module('polliwogApp')
  .controller('EditPollCtrl', function ($scope, lodash, $state, CurrentLecture, EditPoll, socket, $mdDialog, $log, $mdMedia) {


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


    $scope.choiceStatistics = function (choice, question) {
      if(question.hasOwnProperty('nb_participation') && question.nb_participation != 0) {
        var value = choice.answer_count / question.nb_participation * 100;
        choice.stats = value;
        return value;
      } else {
        return 0;
      }
    };

    $scope.toolbarOpen = false;

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
        })
        .then(function (answer) {
          if ($scope.new && answer === 'cancel')
            $state.go('polls', {lectureSlug: CurrentLecture.slug});
        });


    };

    if($scope.new){
      $scope.editTitle(null, $scope.poll.title);
    }

    $scope.editImage = function (event) {
      angular.noop(event);
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

    $scope.getClassState = function (poll) {
      return poll.state;
    };

    $scope.removeQuestion = function (question) {
      EditPoll.removeQuestion(question);
    };

  });
