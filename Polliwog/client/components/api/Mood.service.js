'use strict';

angular.module('polliwogApp')
  .factory('Mood', function () {
    // Public API
    return {
      get: function(lecture_id, mood_id) {
        var mood = $resource("/api/lectures/:lid/moods/:mid",
          {lid:lecture_id, mid:mood_id},
          {get: {method: "GET", isArray: false}});

        return mood.get();
      },
      // retrieving moods from a particular lecture
      list: function(lecture_id) {
        var moods = $resource("/api/lectures/:lid/moods",
          {lid:lecture_id},
          {query: {method: "GET", isArray: false}});

        return moods.query();
      }
    };
  });
