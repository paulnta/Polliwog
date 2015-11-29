angular.module('polliwogApp')
  .config(function ($stateProvider) {

    $stateProvider
      /*
       * Default state for poll
       * It shows a list of polls and a side preview
       */
      .state('speaker.polls', {
        url: '/polls',
        views: {
          "" : {
            templateUrl: 'app/speaker/polls/polls.html',
            controller: 'PollsCtrl'
          },
          "list@speaker.polls": {
            template: "<p>poll list<p>"
          },
          "preview@speaker.polls":{
            template: "<p>single poll preview<p>"
          }
        }
      })
  });
