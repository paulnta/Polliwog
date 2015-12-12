'use strict';

angular.module('polliwogApp')
  .directive('resourceList', function () {
    return {
      templateUrl: 'app/directives/resource-list/resource-list.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
