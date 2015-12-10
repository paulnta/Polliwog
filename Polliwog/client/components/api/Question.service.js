'use strict';

angular.module('polliwogApp')
    .factory('Question', function($resource) {
        return {
            get: function(lecture_id, poll_id, question_id) {
                var question = $resource("/api/lectures/:lid/polls/:pid/questions/:qid",
                    {lid:lecture_id, pid:poll_id, qid:question_id},
                    {get: {method: "GET", isArray: false}});
                
                return question.get();
            },
            list: function(lecture_id, poll_id) {
                var questions = $resource("/api/lectures/:lid/polls/:pid/questions",
                    {lid:lecture_id, pid:poll_id},
                    {query: {method: "GET", isArray: false}});
                
                return questions.query();
            },
            create: function(lecture_id, poll_id, title, type) {
                var questions = $resource("/api/lectures/:lid/polls/:pid/questions",
                    {lid:lecture_id, pid:poll_id});
                var newQuestion = new questions({title:title, type:type});
                newQuestion.$save();
            }
        };
    });
