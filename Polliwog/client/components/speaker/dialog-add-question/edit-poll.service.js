/**
 * Created by paulnta on 06.12.15.
 */

angular.module('polliwogApp')
  .factory('EditPoll', function (Poll) {
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
        if(!poll.questions){
          poll.questions = [];
        }
        return poll;
      },

      /**
       * Add or edit a question
       * @param question
       */
      saveQuestion: function (question) {

        console.log({ready: question});
        // modify if exist
        var index = poll.questions.indexOf(question);

        if(question.hasOwnProperty('_id')){
          console.info('this question already exist, will update');
        // add new question
        } else {
          console.info('this is a new question');
          poll.questions.push(question);
        }

        console.log({veryready: question});
        Poll.saveQuestion(question);
      },

      removeQuestion: function (question) {
        var index = poll.questions.indexOf(question);
        poll.questions.splice(index,1);
      },

      saveTitle: function (title) {
        poll.title = title;
        Poll.save(poll);
      },

      save: function () {

      }
    };

  });
