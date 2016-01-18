/**
 * Created by paulnta on 18.01.16.
 */

/**
 * Stores speakers socket related to lectures
 * TODO: use database
 */
var speakersSockets = {};

// add or update a speaker socket corresponding to a lecture key
exports.setSpeakerSocket = function (socket, key) {
  speakersSockets[key] = socket;
  console.log('speaker: key ' + key + ' id: ' + socket.id);
};

// get the speaker socket corresponding to a lecture key
exports.getSpeakerSocket = function (key) {
  return speakersSockets[key];
};
