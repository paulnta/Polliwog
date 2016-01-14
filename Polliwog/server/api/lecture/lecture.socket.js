/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Lecture = require('./lecture.model');

exports.register = function(socket) {

  Lecture.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Lecture.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });

  // join a lecture by key => register member in the corresponding lecture room and send info about this lecture
  socket.on('lecture:join', function (key) {

    /**
     * Ici l'utilisateur est ajouté à la room de la session. Le nom de cette room est la clé de la session (ex: XVRF9)
     * Cela permet de distribuer nos socket uniquement à ceux qui sont connectés à cette romm (session)
     *
     * On communique avec eux avec : socket.to(nom de la room).emit(nom de l'évenement, données)
     * Example: socket.to(key).emit(poll:start, poll);
     */
    socket.join(key);

    console.log('[SOCKET] join session: ' + key);
    Lecture.findOne({key: key}, function (err, lecture) {
      if(err) {
        console.log(err);
        socket.emit('lecture:join', err);
      } else {
        socket.emit('lecture:join', lecture);
      }
    });
  });

  /**
   * TODO: Ce code est par rapport au Poll, pas au lecture.. à mettre dans le fichier poll.socket.js
   */
  // speaker starts a lecture poll => notify all members in the lecture room
  //socket.on('lecture:pollStart', function (poll) {
  //  console.log('[SOCKET] Speaker has started poll : ' + poll._id + ' from lecture : ' + poll.lecture);
  //  socket.join(poll.lecture + poll._id);  // TODO: Pourquoi socket.join(poll.lecture + poll._id ) ??? (marche pas)
                                             // TODO: Alors que plus haut tu as utilisé socket.join(key) ??
  //  socket.to(poll.lecture).emit('lecture:pollStartNotification', poll);
  //});
  // student vote for a poll => notify speaker about new results
  //socket.on('lecture:vote', function (data) {
  //  console.log('[SOCKET] Student has voted for poll : ' + data.pollId + ' from lecture : ' + data.key);
  //  socket.to(data.key + data.pollId).emit('lecture:pollResultsUpdated', data);
  //  // todo update poll results in DB
  //});
};

function onSave(socket, doc, cb) {
  socket.emit('lecture:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('lecture:remove', doc);
}
