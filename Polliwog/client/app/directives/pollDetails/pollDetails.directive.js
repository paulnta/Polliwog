'use strict';

angular.module('polliwogApp')

  .directive('pollDetails', function () {
    return {
      templateUrl: 'app/directives/pollDetails/pollDetails.html',
      restrict: 'E', // only match element names : <poll-details></poll-details>
      scope: {
        poll : '=',  // poll data
        mode: '@'    // mode preview or edit
      },
      controller: 'EditPollCtrl',
      link: function (scope, element, attrs) {

        var header = $('poll-details .header');
          header.css({
          'background-image': 'url(' + scope.defaultImage +')',
          'background-size' : 'cover',
          'background-repeat' : 'no-repeat'
        });

        function previewHeight() {
          var windowH = $(window).height();
          var headerH = $('#navigation').height();
          if(!headerH) {
            headerH = 128;
          }
          var preview = $('.auto-height .wrapper');
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

