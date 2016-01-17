'use strict';

angular.module('polliwogApp')
  .factory('Lecture', function ($state, $resource) {
    return $resource('/api/lectures/:id',
      {id: '@_id'},
      {
        update: {method: 'PUT'}
      }
    );
  });
