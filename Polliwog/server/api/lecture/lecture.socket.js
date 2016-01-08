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

  // join a lecture by key
  socket.on('lecture:join', function (key) {
    socket.join(key);
    console.log('[SOCKET] join session: ' + key);
  });

  // send the message to all others client connected to the room
  socket.on('lecture:broadcast', function (data) {
    console.log('[SOCKET] broadcast: ' + data);
    socket.to(data.key).emit('lecture:broadcast', data);
  });

};

function onSave(socket, doc, cb) {
  socket.emit('lecture:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('lecture:remove', doc);
}
