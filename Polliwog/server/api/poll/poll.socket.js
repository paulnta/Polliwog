/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Poll = require('./poll.model');

exports.register = function(socket) {
  Poll.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Poll.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });

  /**
   * Ce code à avoir avec les Poll et c'est pourquoi il est ici.
   * Et note le nom de l'évenement : poll:start et non lecture:pollstart... (c'est plus propre est plus compréhensible)
   *
   */
  socket.on('poll:start', function (data) {


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

};

function onSave(socket, doc, cb) {
  socket.emit('poll:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('poll:remove', doc);
}
