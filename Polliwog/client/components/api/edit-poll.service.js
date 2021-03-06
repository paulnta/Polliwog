/**
 * Created by paulnta on 06.12.15.
 */

angular.module('polliwogApp')
  .factory('EditPoll', function (Poll, lodash, $state, Question, $log, CurrentLecture) {
    'use strict';

    var poll = {};

    return {

      /**
       * Create a new poll
       * @returns {{}}
       */
      create: function () {
        poll = {
          title: 'New Poll',
          questions: []
        };
        return poll;
      },

      /**
       * Register an existing poll
       * @param existingPoll
       * @returns {{}}
       */
      registerPoll: function (existingPoll) {
        poll = existingPoll;
        return poll;
      },

      getRegisteredPoll: function () {
        return poll;
      },
      /**
       * Add or edit a question
       * @param question
       */
      saveQuestion: function (question) {

        if(question.hasOwnProperty('_id')){
          console.info('this question already exist, will update');

          // update existing question
          Question.update({lectureId: poll.lecture}, question, function (doc) {
            $log.debug({'updated': doc});
          });

        } else {
          // add new question
          console.info('this is a new question');
          Question.save({lectureId: poll.lecture, pollId: poll._id}, question, function (doc) {
            $log.debug({'saved': doc});
            poll.questions.push(question);
            console.log(poll.questions);
          });
        }


      },

      removeQuestion: function (question) {
        return Question.delete({lectureId: poll.lecture, pollId: poll._id}, question, function () {
          var index = poll.questions.indexOf(question);
          if(index >= 0)
            poll.questions.splice(index, 1);
        });
      },

      saveTitle: function (title) {
        poll.title = title;
        if(poll.hasOwnProperty('_id')) {
          poll.$update(function (doc) {
            $log.debug({'updated': doc});
          });
        } else {
          CurrentLecture.$promise.then(function () {
            Poll.save({lectureId: CurrentLecture._id}, poll, function (doc) {
              $log.debug({'saved': doc});
              $state.go('polls.details', {pollId: doc._id})
            });
          });
        }
      }
    };

  });
