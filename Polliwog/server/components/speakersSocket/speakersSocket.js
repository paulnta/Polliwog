/**
 * Created by paulnta on 18.01.16.
 */

var speakersSockets = {};

exports.setSpeakerSocket = function (socket, key) {
  speakersSockets[key] = socket;
};

exports.getSpeakerSocket = function (key) {
  return speakersSockets[key];
};
