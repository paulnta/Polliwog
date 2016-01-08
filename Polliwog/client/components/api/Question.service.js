'use strict';

angular.module('polliwogApp')
    .factory('Question', function($resource) {
      return $resource('/api/lectures/:lectureId/polls/:pollId/questions/:questionId',
        {pollId: '@poll', questionId: '@_id'},
        {
          update: {method: 'PUT'}
        }
      );
    });
