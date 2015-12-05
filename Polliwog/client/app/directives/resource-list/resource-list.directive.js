'use strict';

angular.module('polliwogApp')
  .directive('resourceList', function ($timeout) {
    return {
      templateUrl: 'app/directives/resource-list/resource-list.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        //$timeout(function () {
        //  var cards = document.querySelectorAll('pw-card-image');
        //  var elements = [];
        //  for(var i=0; i < cards.length; i++) {
        //    var box = cards[i].getBoundingClientRect();
        //    elements[box.left][0] = box;
        //    //console.log(box);
        //  }
        //
        //  console.log(elements[256]);
        //}, 1000);
      }
    };
  });
