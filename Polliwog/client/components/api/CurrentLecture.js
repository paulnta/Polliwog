/**
 * Provides the current lecture to all controllers
 */
angular.module('polliwogApp')
  .factory('CurrentLecture', function ($rootScope, Lecture) {
    var currentLecture = {};

    // set the currentLecture object by id
    function setCurrentLecture(lectureId){
      currentLecture = Lecture.get({id: lectureId});
      currentLecture.$promise.then(function (lecture) {
      });
    }

    // update current Lecture on state change
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
      if(toParams.hasOwnProperty('lectureId')) {
        setCurrentLecture(toParams.lectureId);
      }
    });

    return currentLecture;
  });
