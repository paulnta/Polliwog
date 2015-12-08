'use strict';

angular.module('polliwogApp')

    .factory('Poll', function(Lecture) {

    var backgrounds = [
      '/assets/images/back00.jpg',
      '/assets/images/back01.jpg',
      '/assets/images/back02.jpg',
      '/assets/images/back03.jpg'
    ];

        return {
          list: function (lectureId) {

            var lectures = Lecture.list();

            for(var i=0; i < lectures.length; i++) {
              if (lectures[i].id == lectureId) {
                return lectures[i].polls;
              }
            }

            return [];
          },

          // TODO: Use API
          get : function (pollId) {
            return {
              title: 'Poll title',
              id: 31
            };
          },

            getDefaultBackImage: function () {
              var img =  backgrounds[Math.floor(Math.random()* backgrounds.length)];
              console.log(Math.floor(Math.random()* backgrounds.length)+1);
              return img;

            }
        };
    });
