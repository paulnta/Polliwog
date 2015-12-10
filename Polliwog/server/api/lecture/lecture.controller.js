'use strict';

var _ = require('lodash');
var rand = require("random-key");
var Lecture = require('./lecture.model');

// Get list of lectures
exports.index = function (req, res) {
  Lecture.find({ speaker: req.user._id }, function (err, lectures) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(lectures);
  });
};

// Get a single lecture
exports.show = function (req, res) {
  Lecture.findOne({ _id: req.params.id, speaker: req.user._id }, function (err, lecture) {
    if (err) { return handleError(res, err); }
    if (!lecture) { return res.status(404).send('Not Found'); }
    return res.json(lecture);
  });
};

// Creates a new lecture in the DB.
exports.create = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  if (req.body.listeners) { delete req.body.listeners; }
  if (req.body.moods) { delete req.body.moods; }
  if (req.body.polls) { delete req.body.polls; }
  if (req.body.resources) { delete req.body.resources; }
  if (req.body.creationDate) { delete req.body.creationDate; }

  // generate key then save the lecture
  generateKey().then(function (key) {
    req.body.speaker = req.user._id;
    req.body.key = key;
    Lecture.create(req.body, function (err, lecture) {
      if (err) {return handleError(res, err);}
      return res.status(201).json(lecture);
    });
  });
};

// Updates an existing lecture in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  if (req.body.key) { delete req.body.key; }
  if (req.body.speaker) { delete req.body.speaker; }
  if (req.body.listeners) { delete req.body.listeners; }
  if (req.body.moods) { delete req.body.moods; }
  if (req.body.polls) { delete req.body.polls; }
  if (req.body.resources) { delete req.body.resources; }
  if (req.body.creationDate) { delete req.body.creationDate; }
  Lecture.findOne({ _id: req.params.id, speaker: req.user._id }, function (err, lecture) {
    if (err) { return handleError(res, err); }
    if (!lecture) { return res.status(404).send('Not Found'); }
    var updated = _.merge(lecture, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(lecture);
    });
  });
};

// Deletes a lecture from the DB.
exports.destroy = function (req, res) {
  Lecture.findOne({ _id: req.params.id, speaker: req.user._id }, function (err, lecture) {
    if (err) { return handleError(res, err); }
    if (!lecture) { return res.status(404).send('Not Found'); }
    lecture.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

/**
 * Generate a Key for lectures
 * Retry if the key is already used
 * @returns {*|Promise}
 */
function generateKey(){
  return tryGenerateKey().catch(function () {
    return generateKey();
  });
}

/**
 * Generate a Lecture Key and check if this is a  unique key
 * reject the promise if not unique, else resolve
 * TODO: Increment key length if all key are already used.
 * @returns {Promise}
 */
function tryGenerateKey() {
  return new Promise(function (resolve, reject) {
    var key = rand.generate(5);
    Lecture.findOne({key: key}, function (err, lecture) {
      if (!lecture) {
        resolve(key);
      } else {
        reject(key);
      }
    });
  });
}

