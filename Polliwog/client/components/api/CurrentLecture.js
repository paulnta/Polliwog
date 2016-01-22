/**
 * Provides the current lecture to all controllers
 */
angular.module('polliwogApp')
  .factory('CurrentLecture', function ($rootScope, $q,  Lecture, lodash, $stateParams) {


    var currentLecture = $q.defer();

    if($stateParams.lectureSlug)
      currentLecture = Lecture.get({id: $stateParams.lectureSlug, slug: true});

    // set the currentLecture object by id
    function setCurrentLecture(lectureSlug){
      if(lectureSlug) {
        Lecture.get({id: lectureSlug, slug: true}).$promise.then(function (lecture) {
          lodash.merge(currentLecture, lecture);
        });
      }
    }

    // update current Lecture on state change
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
      if(toParams.hasOwnProperty('lectureSlug')) {
        setCurrentLecture(toParams.lectureSlug);
      }
    });

    return currentLecture;
  });
