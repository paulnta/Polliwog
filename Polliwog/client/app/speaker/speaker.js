

angular.module('polliwogApp')
  .config(function ($stateProvider) {
    'use strict';

    $stateProvider
      /*
       * Abstract state that defines the speaker page layout
       */
      .state('speaker', {
        data: {

          // this object is shared with any child view
          // and specifies that users need to have a speaker role to access this view
          // if not, users are redirected to the login state. (see app.js : $stateChangeStart)
          authenticate: {
            role: 'speaker'
          }
        },
        abstract: true,
        views: {

          /*
           * The unnamed view "<div ui-view>" of index.html
           * is used to show the speakers layout
           */
          '' : {
            templateUrl: 'app/speaker/layout.html',
            controller: 'SpeakerCtrl'
          },

          /*
           * The named view '<div ui-view='navigation'>' of speaker.html
           * has a dynamic toolbar which can be redefined by other views.
           */
          'navigation@speaker':{
            templateUrl: 'components/speaker/toolbar/toolbar-lecture.html',
            controller: 'toolbarLectureCtrl'
          }
        }
      });

  });
