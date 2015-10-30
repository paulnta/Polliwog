'use strict';

var _ = require('lodash');
var Participation = require('./participation.model');

// Get list of participations
exports.index = function (req, res) {
  Participation.find({ poll: req.params.poll_id }, function (err, participations) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(participations);
  });
};

// Get a single participation
exports.show = function (req, res) {
  Participation.findOne({ _id: req.params.id, poll: req.params.poll_id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    return res.json(participation);
  });
};

// Creates a new participation in the DB.
exports.create = function (req, res) {
  req.body.poll = req.params.poll_id;
  if(req.body.answers) { delete req.body.answers; }
  Participation.create(req.body, function (err, participation) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(participation);
  });
};

// Updates an existing participation in the DB.
exports.update = function (req, res) {
  if(req.body._id) { delete req.body._id; }
  if(req.body.poll) { delete req.body.poll; }
  if(req.body.answers) { delete req.body.answers; }
  Participation.findOne({ _id: req.params.id, poll: req.params.poll_id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    var updated = _.merge(participation, req.body);
    updated.save(function (err) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(participation);
    });
  });
};

// Deletes a participation from the DB.
exports.destroy = function (req, res) {
  Participation.findOne({ _id: req.params.id, poll: req.params.poll_id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    participation.remove(function (err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}