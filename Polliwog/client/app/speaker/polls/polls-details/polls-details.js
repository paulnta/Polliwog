angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider

      /*
       * full preview state
       * - It shows the preview element but in a full view
       * - It redefines the toolbar in an extended toolbar
       *  which have only a back link
       */
      .state('polls.details', {
        url: '/:id',
        views : {
              "@speaker": {
                templateUrl: 'app/speaker/polls/polls-details/polls-details.html',
                controller: 'PollsDetailsCtrl'
              },
              "navigation@speaker": {
                templateUrl: 'components/speaker/toolbar/toolbar-extended.html'
              }
            }
      });
  });
