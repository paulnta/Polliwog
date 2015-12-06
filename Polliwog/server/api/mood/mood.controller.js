'use strict';

var _ = require('lodash');
var Mood = require('./mood.model');

// Get list of moods
exports.index = function(req, res) {
  Mood.find({ lecture: req.body.lecture }, function (err, moods) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(moods);
  });
};

// Get a single mood
exports.show = function(req, res) {
  Mood.findOne({ _id: req.params.id, lecture: req.body.lecture }, function (err, mood) {
    if(err) { return handleError(res, err); }
    if(!mood) { return res.status(404).send('Not Found'); }
    return res.json(mood);
  });
};

// Creates a new mood in the DB.
exports.create = function(req, res) {
  if (req.body._id) { delete req.body._id; }
  if (req.body.creationDate) { delete req.body.creationDate; }
  if (req.body.questions) { delete req.body.questions; }

  Mood.create(req.body, function(err, mood) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(mood);
  });
};

// Updates an existing mood in the DB.
exports.update = function(req, res) {
  if (req.body._id) { delete req.body._id; }
  Mood.findOne({ _id: req.params.id, lecture: req.body.lecture }, function (err, mood) {
    if (err) { return handleError(res, err); }
    if(!mood) { return res.status(404).send('Not Found'); }
    var updated = _.merge(mood, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(mood);
    });
  });
};

// Deletes a mood from the DB.
exports.destroy = function(req, res) {
  Mood.findOne({ _id: req.params.id, lecture: req.body.lecture }, function (err, mood) {
    if(err) { return handleError(res, err); }
    if(!mood) { return res.status(404).send('Not Found'); }
    mood.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
