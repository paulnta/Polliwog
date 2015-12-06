/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Mood = require('./mood.model');

exports.register = function(socket) {
  Mood.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Mood.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('mood:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('mood:remove', doc);
}
