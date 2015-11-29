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

      /*
       * full preview state
       * - It shows the preview element but in a full view
       * - It redefines the toolbar in an extended toolbar
       *  which have only a back link
       */
      .state('speaker.polls.preview', {
        url: '/:id',
        views : {
          "@speaker": {
            templateUrl: 'app/speaker/polls/polls-preview.html',
            controller: function ($scope) {
            }
          },
          "navigation@speaker": {
            templateUrl: 'components/speaker/toolbar/toolbar-extended.html'
          }
        }
      })
  });
