'use strict';

angular.module('polliwogApp')

  .factory('Poll', function(Lecture, $resource) {

    var api = $resource('/api/lectures/:lecture_id/polls/:poll_id', {poll_id: '@_id'});
    var Question = $resource('/api/lectures/:lecture_id/polls/:poll_id/questions/:question_id', {
      question_id: '@_id',
      poll_id: '@poll'
    }, {
      update: {method: 'PUT'}
    });

    var Choice = $resource('/api/lectures/:lecture_id/polls/:poll_id/questions/:question_id/choices/:choice_id', {
      choice_id: '@_id',
      question_id: '@question',
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

    function saveSingleChoice(params, doc){
      return new Promise(function (resolve, reject) {

        // choose the correct method (save if it's a new choice otherwise update)
        var method = doc._id ? 'update' : 'save';
        doc.key = doc.key || 'A';
        return Choice[method](params, doc).$promise.then(function (choice) {
          if(choice){
            resolve(choice);
          } else {
            reject(choice);
          }
        });
      });
    }

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

          var nbChoices = question.choices.length;
          var params = {lecture_id: lectureId, poll_id: question.poll, question_id: question._id};

          // save all choices
          for(var i=0; i < nbChoices; i++){

            (function (index) {
              saveSingleChoice(params, question.choices[index]).then(function (data) {
                console.log(data);
                if(index == nbChoices){
                  callback()
                }
              });

            })(i);
          }

        });
      }
    };
  });
