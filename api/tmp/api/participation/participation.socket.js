/**
 * participation.socket.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 */

/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Participation = require('./participation.model');

exports.register = function(socket) {
  Participation.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Participation.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('participation:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('participation:remove', doc);
}