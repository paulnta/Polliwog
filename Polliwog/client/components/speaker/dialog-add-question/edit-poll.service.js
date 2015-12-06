/**
 * Created by paulnta on 06.12.15.
 */

angular.module('polliwogApp')
  .factory('EditPoll', function ($state) {
    var poll = {};

    return {


      create: function () {
        poll = {
          title: 'New Poll provided by Edit Poll service',
          questions: []
        };
        return poll;
      },

      registerPoll: function (existingPoll) {
        poll = existingPoll;
        if(!poll.questions){
          poll.questions = [];
        }
        return poll;
      },

      getQuestions: function () {
        return poll.questions;
      },

      getChoices: function (question) {
        return poll.questions.find(question).choices;
      },

      addChoice: function (choice, question) {
        poll.questions.find(question).push(choice);
        console.log('added choice');
      },

      addQuestion: function (question) {
        poll.questions.push(question);
        console.log('added Question');
        console.log(poll.questions);
      },

      save: function () {
        console.log('save poll');
      }
    };

  });
