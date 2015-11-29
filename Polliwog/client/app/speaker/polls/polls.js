angular.module('polliwogApp')
  .config(function ($stateProvider) {

    $stateProvider
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

  });
