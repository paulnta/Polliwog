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

        function previewHeight() {
          var windowH = $(window).height();
          var headerH = $('#navigation').height();
          if(!headerH) {
            headerH = 128;
          }
          var preview = $('.autoheight #autosized-wrapper');
          if(preview) {
            var newH = (windowH - headerH - 5);
            preview.css('height', newH + 'px');
          } else {
            console.log('element no found');
          }
        }
        setTimeout(previewHeight, 0);
        window.addEventListener("resize", previewHeight);
      }
    };
  });
