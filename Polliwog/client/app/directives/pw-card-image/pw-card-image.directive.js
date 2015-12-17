'use strict';

angular.module('polliwogApp')
  .directive('pwCardImage', function () {
    return {
      templateUrl: 'app/directives/pw-card-image/pw-card-image.html',
      restrict: 'E',
      scope: {
        'title': '@',
        'subTitle': '@',
        'date': '@',
        'file': '@',
        'logo': '@',
        'content': '@'
      },
      controller: function ($scope) {
        $scope.limit = 250;

        $scope.collapseContent = function () {
          $scope.textContentLimit = $scope.limit;
          $scope.collapsed = true;
        };

        $scope.textOverflow = function () {
          return $scope.textLength && $scope.limit < $scope.textLength;
        };

        $scope.expandContent = function () {
          $scope.textContentLimit = $scope.textLength;
          $scope.collapsed = false;
        };

        $scope.toggleCollapse = function () {
          if($scope.collapsed){$scope.expandContent();}
          else { $scope.collapseContent();}
        };

      },
      link: function (scope, element, attrs) {
        scope.textLength = attrs.content.length;

        // we collapse the content by default
        scope.collapseContent();
      }
    };
  });
