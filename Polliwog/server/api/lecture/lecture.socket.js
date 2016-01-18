/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Lecture = require('./lecture.model'),
  Poll = require('../poll/poll.model'),
  speakersSockets = require('../../components/speakersSocket/speakersSocket');

exports.register = function(socket) {

  Lecture.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Lecture.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });

  socket.on('lecture:speakerConnect', function (key) {
    speakersSockets.setSpeakerSocket(socket, key);
  });

  /**
   * join a lecture by key => register member in the corresponding lecture room and send info about this lecture
   */
  socket.on('lecture:join', function (key) {

    socket.join(key);

    Lecture.findOne({key: key}, function (err, lecture) {
      if(!err) {
        // find activated polls
        Poll.find({state: 'active', lecture: lecture._id})
          .populate('questions')
          .exec(function (err, polls) {
          if(!err){
            socket.emit('lecture:join', {lecture: lecture, polls: polls});
          }
        });
      }
    });
  });
};

function onSave(socket, doc, cb) {
  socket.emit('lecture:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('lecture:remove', doc);
}
