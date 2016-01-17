/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Poll = require('./poll.model');
var speakerSocket;
exports.register = function(socket) {
  Poll.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Poll.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });

  socket.on('poll:start', function (data) {


    speakerSocket  = socket;
    /**
     * Le speaker passe la clé de la session, c'est plus simple pour le serveur car
     * nous devons transmettre le poll à tout les utilisateurs connectés à la room ayant cette clé comme nom.
     */
    var key = data.key;

    /**
    *  Le poll en question
    */
    var poll = data.poll;

    // ici en envoi bien le poll à tout les utilisateurs connecté à la room
    socket.to(key).emit('poll:start', poll);
  });
  /**
   * A la réception d'un nouveau vote -> mise à jour des résultats en base de données
   * -> On notifie le speaker des nouveaux résultats
   */
  socket.on('poll:vote', function (data) {
    Poll.findById(data.pollId, function (err, poll) {
      if (err) { return ;}//TODO handleError(res, err); }
      if(!poll) { return res.status(404).send('Not Found'); }
      for(var i = 0; i < poll.questions.length ; i ++){
        var question = poll.questions[i];
        var selectedChoice = data.results[question.title];
        for(var j = 0; j < poll.questions.choices ; j++){
          var choice = poll.questions.choices[j];
          if(choice.key == selectedChoice ){
            choice.answer_count ++;
          }
        }
      }

      //var updated = _.merge(poll, req.body);
      poll.save(function (err, doc) {
        //Poll.populate(doc, {path: 'questions'}, function (err, poll) {
        //  if (err) {
        //    return handleError(res, err);
        //  }
        //  return res.status(200).json(poll);
        //});
      });
      speakerSocket.emit('poll:results', poll);
    });
  });


};



function onSave(socket, doc, cb) {
  socket.emit('poll:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('poll:remove', doc);
}
