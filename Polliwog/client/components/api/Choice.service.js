'use strict';

angular.module('polliwogApp')
    .factory('Choice', function($resource) {
        return {
            get: function(lectureId, pollId, questionId, choiceId) {
                var Choice = $resource('/api/lectures/:lid/polls/:pid/questions/:qid/choices/:cid',
                    {lid:lectureId, pid:pollId, qid:questionId, cid:choiceId},
                    {get: {method: 'GET', isArray: false}});

                return Choice.get();
            },
            list: function(lectureId, pollId, questionId) {
                var Choice = $resource('/api/lectures/:lid/polls/:pid/questions/:qid/choices',
                    {lid:lectureId, pid:pollId, qid:questionId},
                    {query: {method: 'GET', isArray: false}});

                return Choice.query();
            },
            create: function(lectureId, pollId, questionId, key, text) {
                var Choices = $resource('/api/lectures/:lid/polls/:pid/questions/:qid/choices',
                    {lid:lectureId, pid:pollId, qid:questionId});
                var newChoice = new Choices({key:key, text:text});
                newChoice.$save();
            }
        };
    });
