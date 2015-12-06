'use strict';

var _ = require('lodash');
var Choice = require('./choice.model');

// Get list of choices
exports.index = function(req, res) {
  Choice.find({ question: req.body.question }, function (err, choices) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(choices);
  });
};

// Get a single choice
exports.show = function(req, res) {
  Choice.findOne({ _id: req.params.id, question: req.body.question }, function (err, choice) {
    if(err) { return handleError(res, err); }
    if(!choice) { return res.status(404).send('Not Found'); }
    return res.json(choice);
  });
};

// Creates a new choice in the DB.
exports.create = function(req, res) {
  if (req.body._id) { delete req.body._id; }
  if (req.body.answer_count) { delete req.body.answer_count; }
  
  Choice.create(req.body, function(err, choice) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(choice);
  });
};

// Updates an existing choice in the DB.
exports.update = function(req, res) {
  if (req.body._id) { delete req.body._id; }
  if (req.body.answer_count) { delete req.body.answer_count; }
  
  Choice.findOne({ _id: req.params.id, question: req.body.question }, function (err, choice) {
    if (err) { return handleError(res, err); }
    if(!choice) { return res.status(404).send('Not Found'); }
    var updated = _.merge(choice, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(choice);
    });
  });
};

// Deletes a choice from the DB.
exports.destroy = function(req, res) {
  Choice.findOne({ _id: req.params.id, question: req.body.question }, function (err, choice) {
    if(err) { return handleError(res, err); }
    if(!choice) { return res.status(404).send('Not Found'); }
    choice.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}