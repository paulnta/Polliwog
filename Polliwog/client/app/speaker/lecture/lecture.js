/**
 * lectures/ list of lectures
 * lectures/:lectureId
 * lectures/:lectureId/polls
 * lectures/:lectureId/questions
 *
 */
angular.module('polliwogApp')
  .config(function ($stateProvider) {
    $stateProvider

      /*
       * This state is just used to prepend /lectures
       * to all urls
       *
       * We could use this state to show a lecture list.
       * But for now, lectures are listed in the side navigation
       */
      .state('speaker.lectures', {
        url: '/lectures',
        abstract: true,
      })

      /*
       * Note that the name of this state doesn't use the dot notation
       * because we want to keep short names when creating links.
       * So we need to use the parent attr to refer to the parent state.
       *
       * To create a link to this state, use : ui-sref="lecture({lectureId: <your-lecture-id>})"
       */
      .state('lecture', {
        parent: 'speaker.lectures',
        url: '/:lectureId',
        views : {

          /*
           * The unnamed view (@speaker) of the speaker state  (using speaker.html as template),
           * shows our lecture content
           *
           * All other sibling views : Polls, Questions, will use the same element view
           * to show their content.
           */
          "@speaker": {
            templateUrl: 'app/speaker/lecture/lecture.html',
            controller: 'LectureCtrl'
          }
        }
      })

  });
