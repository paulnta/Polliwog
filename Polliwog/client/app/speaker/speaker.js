

angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('speaker', {
        abstract: true,
        views: {
          "" : {
            templateUrl: 'app/speaker/speaker.html',
            controller: 'SpeakerCtrl'
          },
          "navigation@speaker":{
            template: "<a ui-sref='speaker.session'>session</a> - <a ui-sref='speaker.polls.default'>polls</a> - <a ui-sref='speaker.questions'>question</a>"
          }
        }
      })
      .state('speaker.session', {
        url: '/session',
        views: {
          "": {
            templateUrl: 'app/speaker/session/session.html',
            controller: 'SessionCtrl'
          }
        }
      })
      .state('speaker.polls', {
        url: '/polls',
        abstract: true,
        views: {
          "" : {
            templateUrl: 'app/speaker/polls/polls.html',
            controller: 'PollsCtrl'
          }
        }
      })
      .state('speaker.polls.default', {
        url: '',
        views: {
          "" : {
            templateUrl: 'app/speaker/polls/list-polls.html',
            controller: 'PollsCtrl'
          },
          "list@speaker.polls.default": {
              template: "<p>poll list<p>"
          },
          "preview@speaker.polls.default":{
            template: "<p>single poll preview<p>"
          }
        }
      })
      .state('speaker.polls.preview', {
        url: '/:id',
        views : {
          "": {
            template: '<h1>poll preview</h1>',
            controller: function ($scope) {
            }
          }
        }
      })
      .state('speaker.questions', {
        url: '/questions',
        templateUrl: 'app/speaker/questions/questions.html',
        controller: 'QuestionsCtrl'
      });
  });
