'use strict';

angular.module('polliwogApp')
  .factory('Lecture', function ($state, $resource, $stateParams, $rootScope) {

    var api = $resource('/api/lectures/:id', {id: '@_id'});

    var list = api.query();
    var currentLecture = {};

    function setCurrentLecture(lectureId){
      // faster to search within current lecture than making a request
      for(var i =0; i < list.length; i++){
        if(list[i]._id === lectureId){
          currentLecture = list[i];
          break;
        }
      }
    }

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
      //console.info('$stateChangeSuccess, lecture: ' + toParams.lectureId);
      if(toParams.hasOwnProperty('lectureId')) {
        setCurrentLecture(toParams.lectureId);
      }
    });

    // Public API here
    return {

      api: api,

      list: function () {
        return api.query();
      },

      current: function () {
        return currentLecture;
      }
    };

  });
