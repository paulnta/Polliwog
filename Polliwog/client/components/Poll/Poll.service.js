'use strict';

angular.module('polliwogApp')

    .factory('Poll', function($resource) {

    var backgrounds = [
      '/assets/images/back00.jpg',
      '/assets/images/back01.jpg',
      '/assets/images/back02.jpg',
      '/assets/images/back03.jpg'
    ];

        return {
            get: function(lecture_id, poll_id) {
                var poll = $resource("/api/lectures/:lid/polls/:pid",
                    {lid:lecture_id, pid:poll_id},
                    {get: {method: "GET", isArray: false}});

                return poll.get();
            },
            list: function(lecture_id) {
                var polls = $resource("/api/lectures/:lid/polls",
                    {lid:lecture_id},
                    {query: {method: "GET", isArray: false}});

                return polls.query();
            },
            create: function(lecture_id, title, state) {
                var polls = $resource("/api/lectures/:lid/polls",
                    {lid:lecture_id});
                var newPoll = new polls({title:title, state:state});
                newPoll.$save();
            },

            getDefaultBackImage: function () {
              var img =  backgrounds[Math.floor(Math.random()* backgrounds.length)];
              console.log(Math.floor(Math.random()* backgrounds.length)+1);
              return img;

            }
        };
    });
