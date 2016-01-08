/**
 * Provides the current lecture to all controllers
 */
angular.module('polliwogApp')
  .factory('CurrentLecture', function ($rootScope, Lecture, lodash, $stateParams) {
    var currentLecture = {};

    // set the currentLecture object by id
    function setCurrentLecture(lectureSlug){
      if(lectureSlug) {
        Lecture.get({id: lectureSlug, slug: true}).$promise.then(function (lecture) {
          lodash.merge(currentLecture, lecture);
          console.info(currentLecture);
        });

      }
    }

    setCurrentLecture($stateParams.lectureSlug);

    // update current Lecture on state change
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
      if(toParams.hasOwnProperty('lectureSlug')) {
        setCurrentLecture(toParams.lectureSlug);
      }
    });

    return currentLecture;
  });
