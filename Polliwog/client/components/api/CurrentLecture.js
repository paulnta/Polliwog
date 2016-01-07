/**
 * Created by paulnta on 07.01.16.
 */

angular.module('polliwogApp')
  .factory('CurrentLecture', function ($rootScope, Lecture, lodash) {
    var currentLecture = {};
    var lectures = Lecture.query();

    function setCurrentLecture(lectureId){
      currentLecture = lodash.find(lectures, {_id: lectureId});
      console.info({currentLecture: currentLecture});
    }

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
      console.info('$stateChangeSuccess, lecture: ' + toState.lectureId);
      if(toParams.hasOwnProperty('lectureId')) {
        setCurrentLecture(toParams.lectureId);
      }
    });

    return currentLecture;
  });
