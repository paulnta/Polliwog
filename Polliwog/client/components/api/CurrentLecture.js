/**
 * Provides the current lecture to all controllers
 */
angular.module('polliwogApp')
  .factory('CurrentLecture', function ($rootScope, Lecture, lodash) {
    var currentLecture = {};

    // set the currentLecture object by id
    function setCurrentLecture(lectureId){
      console.log('setCurrentLecture');
      Lecture.get({id: lectureId}).$promise.then(function (lecture) {
        lodash.merge(currentLecture, lecture);
      });
    }

    // update current Lecture on state change
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
      console.log('State Change');
      if(toParams.hasOwnProperty('lectureId')) {
        setCurrentLecture(toParams.lectureId);
      }
    });

    return currentLecture;
  });
