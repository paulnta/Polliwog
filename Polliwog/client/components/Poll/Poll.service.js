'use strict';

angular.module('polliwogApp')
  .factory('Poll', function (Lecture) {
    // logic here

    // Public API here
    return {
      list: function (lectureId) {

        var lectures = Lecture.list();

        for(var i=0; i < lectures.length; i++) {
          if (lectures[i].id == lectureId) {
            return lectures[i].polls;
          }
        }

        return [];
      },

      // TODO: Use API
      get : function (pollId) {
        return {
          title: 'Poll title',
          id: 31
        };
      }
    };
  });
