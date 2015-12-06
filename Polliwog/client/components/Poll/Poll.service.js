'use strict';

angular.module('polliwogApp')
    .factory('Poll', function($resource) {
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
            }
        };
    });
