/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var speakersSockets = require('../../components/speakersSocket/speakersSocket'),
  Question = require('../question/question.model');


exports.register = function(socket) {

  /**
   * Speaker send a poll to all connected users
   */
  socket.on('poll:start', function (data) {
    speakersSockets.setSpeakerSocket(socket, data.key);
    var poll = data.poll;
    socket.to(data.key).emit('poll:start', poll);
  });


  /**
   * Users votes and send results to the speaker
   */
  socket.on('poll:vote', function (data) {
    console.log('POLL:VOTE');
    console.log(data);
    var speaker = speakersSockets.getSpeakerSocket(data.key);
    // find the question related to the choice answered
    Question.findById(data.question, function (err, question) {
        if(!err){

          // update answer for this choice
          var choice = question.choices.id(data.choice);
          choice.answer_count += (data.state ? 1 : -1);
          question.save(function (err, question) {

            // notify the speaker related to the session key
            if(speaker) {
              var data = {  pollId : question.poll,
                            question: question };
              console.log(data);
              speaker.emit('poll:updated', data);
            } else {
              console.log('speaker not found');
            }
          });
        }
    });
  });
};
