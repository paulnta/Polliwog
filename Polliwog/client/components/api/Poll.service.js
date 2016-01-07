'use strict';

angular.module('polliwogApp')

  .factory('Poll', function(Lecture, $resource) {

    var api = $resource('/api/lectures/:lecture_id/polls/:poll_id',
      {lecture_id: '@lecture'},
      {poll_id: '@_id'}
    );
    var Question = $resource('/api/lectures/:lecture_id/polls/:poll_id/questions/:question_id', {
      question_id: '@_id',
      poll_id: '@poll'
    }, {
      update: {method: 'PUT'}
    });

    var backgrounds = [
      '/assets/images/back00.jpg',
      '/assets/images/back01.jpg',
      '/assets/images/back02.jpg',
      '/assets/images/back03.jpg'
    ];

    return {
      api: api,

      list: function (lectureId) {
        return api.query({lecture_id: lectureId});
      },

      // TODO: Use API
      get : function (pollId) {
        return api.get({lecture_id: Lecture.current()._id, poll_id: pollId});
      },

      getDefaultBackImage: function () {
        return backgrounds[Math.floor(Math.random()* backgrounds.length)];
      },

      saveQuestion: function (question, callback) {
        var lectureId = Lecture.current()._id;
        // save questions

        Question.update({lecture_id: lectureId}, question, function (doc) {
          console.log({save: doc});
        });
      },

      savePoll: function () {

      }

    };
  });
