'use strict';

angular.module('polliwogApp')
  .factory('Mood', function () {
    // Public API
    return {
      get: function(lectureId, moodId) {
        var Mood = $resource("/api/lectures/:lid/moods/:mid",
          {lid:lectureId, mid:moodId},
          {get: {method: "GET", isArray: false}});

        return Mood.get();
      },
      // retrieving moods from a particular lecture
      list: function(lectureId) {
        var Mood = $resource("/api/lectures/:lid/moods",
          {lid:lectureId},
          {query: {method: "GET", isArray: false}});

        return Mood.query();
      }
    };
  });
