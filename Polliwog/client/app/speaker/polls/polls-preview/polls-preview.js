angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider

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
            templateUrl: 'app/speaker/polls/polls-preview/polls-preview.html',
            controller: function ($scope) {
            }
          },
          "navigation@speaker": {
            templateUrl: 'components/speaker/toolbar/toolbar-extended.html'
          }
        }
      })
  });
