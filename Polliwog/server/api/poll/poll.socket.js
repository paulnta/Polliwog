/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Poll = require('./poll.model'),
  Question = require('../question/question.model');

var speakerSockets = {};
exports.register = function(socket) {
  Poll.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Poll.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });

  socket.on('poll:start', function (data) {

    /**
     * Le speaker passe la clé de la session, c'est plus simple pour le serveur car
     * nous devons transmettre le poll à tout les utilisateurs connectés à la room ayant cette clé comme nom.
     */
    var key = data.key;
    speakerSockets[key] = socket;

    /**
    *  Le poll en question
    */
    var poll = data.poll;

    socket.to(key).emit('poll:start', poll);
  });
  /**
   * A la réception d'un nouveau vote -> mise à jour des résultats en base de données
   * -> On notifie le speaker des nouveaux résultats
   */
  socket.on('poll:vote', function (data) {
    // find the question related to the choice answered
    var pollId;
    Question.findById(data.question, function (err, question) {
        if(!err){
          // update answer for this choice
          var choice = question.choices.id(data.choice);
          choice.answer_count += (data.state ? 1 : -1);
          question.save(function (err) {
            console.log(question.choices);
          });

          // notify the speaker related to the session key
          var speakerSocket = speakerSockets[data.key];
          speakerSocket.emit('poll:updated', {pollId : question.poll});
        }
    });
  });
};


function onSave(socket, doc, cb) {
  socket.emit('poll:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('poll:remove', doc);
}
