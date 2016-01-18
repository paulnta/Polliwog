/**
 * Created by paulnta on 18.01.16.
 */

var speakersSockets = {};

exports.setSpeakerSocket = function (socket, key) {
  speakersSockets[key] = socket;
  console.log('speaker: key ' + key + ' id: ' + socket.id);
};

exports.getSpeakerSocket = function (key) {
  return speakersSockets[key];
};
