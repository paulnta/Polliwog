'use strict';

angular.module('polliwogApp')
  .factory('Poll', function ($resource) {
      return $resource('/api/lectures/:lectureId/polls/:pollId',
        {lectureId: '@lecture', pollId: '@_id'}
      );
  });



//angular.module('polliwogApp')
//  .factory('Poll', function(Lecture, CurrentLecture, $resource) {
//
//    var api = $resource('/api/lectures/:lecture_id/polls/:poll_id',
//      {lecture_id: '@lecture'},
//      {poll_id: '@_id'}
//    );
//    var Question = $resource('/api/lectures/:lecture_id/polls/:poll_id/questions/:question_id', {
//      question_id: '@_id',
//      poll_id: '@poll'
//    }, {
//      update: {method: 'PUT'}
//    });
//
//    return {
//      api: api,
//
//      list: function (lectureId) {
//        return api.query({lecture_id: lectureId});
//      },
//
//      // TODO: Use API
//      get : function (pollId) {
//        return api.get({lecture_id: CurrentLecture._id, poll_id: pollId});
//      },
//
//      saveQuestion: function (question, callback) {
//        var lectureId = CurrentLecture._id;
//        // save questions
//
//        Question.update({lecture_id: lectureId}, question, function (doc) {
//          console.log({save: doc});
//        });
//      },
//      savePoll: function () {
//      }
//    };
//  });
