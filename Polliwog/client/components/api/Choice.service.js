'use strict';

angular.module('polliwogApp')
    .factory('Choice', function($resource) {
        return {
            get: function(lecture_id, poll_id, question_id, choice_id) {
                var choice = $resource("/api/lectures/:lid/polls/:pid/questions/:qid/choices/:cid",
                    {lid:lecture_id, pid:poll_id, qid:question_id, cid:choice_id},
                    {get: {method: "GET", isArray: false}});
                
                return choice.get();
            },
            list: function(lecture_id, poll_id, question_id) {
                var choices = $resource("/api/lectures/:lid/polls/:pid/questions/:qid/choices",
                    {lid:lecture_id, pid:poll_id, qid:question_id},
                    {query: {method: "GET", isArray: false}});
                
                return choices.query();
            },
            create: function(lecture_id, poll_id, question_id, key, text) {
                var choices = $resource("/api/lectures/:lid/polls/:pid/questions/:qid/choices",
                    {lid:lecture_id, pid:poll_id, qid:question_id});
                var newChoice = new choices({key:key, text:text});
                newChoice.$save();
            }
        };
    });
