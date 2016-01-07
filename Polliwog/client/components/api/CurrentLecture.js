/**
 * Provides the current lecture to all controllers
 */
angular.module('polliwogApp')
  .factory('CurrentLecture', function ($rootScope, Lecture, lodash, $stateParams) {
    var currentLecture = {};

    // set the currentLecture object by id
    function setCurrentLecture(lectureId){
      if(lectureId) {
        Lecture.get({id: lectureId}).$promise.then(function (lecture) {
          lodash.merge(currentLecture, lecture);
        });
      }
    }

    setCurrentLecture($stateParams.lectureId);

    // update current Lecture on state change
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
      if(toParams.hasOwnProperty('lectureId')) {
        setCurrentLecture(toParams.lectureId);
      }
    });

    return currentLecture;
  });
