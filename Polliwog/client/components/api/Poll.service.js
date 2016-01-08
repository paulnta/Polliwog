'use strict';

angular.module('polliwogApp')
  .factory('Poll', function ($resource) {
      return $resource('/api/lectures/:lectureId/polls/:pollId',
        {lectureId: '@lecture', pollId: '@_id'},
        {
          update: {method: 'PUT'}
        }
      );
  });
