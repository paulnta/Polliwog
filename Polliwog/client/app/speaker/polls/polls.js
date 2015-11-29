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

          /*
           * polls.html defines 2 named views
           * list: a list of polls
           * preview: a poll preview when selected
           */
          "list@speaker.polls": {
            templateUrl: 'app/speaker/polls/polls-list.html',
            controller: 'PollsListCtrl'
          },
          "preview@speaker.polls":{
            templateUrl: "app/speaker/polls/polls-preview.html"
          }
        }
      })
  });
