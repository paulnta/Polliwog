'use strict';

angular.module('polliwogApp')
  .directive('myDirective', function () {
    return {
      templateUrl: 'app/myDirective/myDirective.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        console.log(attrs);
        console.log(element);
        scope.test = 'salut';
      }
    };
  });
