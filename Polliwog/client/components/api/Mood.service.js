'use strict';

angular.module('polliwogApp')
  .factory('Mood', function () {
    return $resource("/api/lectures/:lid/moods/:mid");
  });
