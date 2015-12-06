/**
 * Created by paulnta on 06.12.15.
 */

angular.module('polliwogApp')
  .factory('EditPoll', function ($state) {
    var poll = {};

    return {

      /**
       * Create a new poll
       * @returns {{}}
       */
      create: function () {
        poll = {
          title: 'New Poll provided by Edit Poll service',
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

        // modify if exist
        var index = poll.questions.indexOf(question);
        if( index !== -1){
          poll.questions[index] = question;

        // add new question
        } else {
          poll.questions.push(question);
        }
      },

      removeQuestion: function (question) {
        var index = poll.questions.indexOf(question);
        poll.questions.splice(index,1);
      },

      save: function () {
        console.log('save poll');
      }
    };

  });
