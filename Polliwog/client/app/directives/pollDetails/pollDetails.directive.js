'use strict';

angular.module('polliwogApp')
  .directive('pollDetails', function () {
    return {
      templateUrl: 'app/directives/pollDetails/pollDetails.html',
      restrict: 'E', // only match element names : <poll-details></poll-details>
      scope: {
        poll : '='
      },
      link: function (/*scope, element, attrs*/) {
      }
    };
  });
