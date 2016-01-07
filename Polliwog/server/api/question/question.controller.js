'use strict';

var _ = require('lodash');
var Question = require('./question.model');
var Poll = require('../poll/poll.model');

// Get list of questions
exports.index = function(req, res) {
  Question.find({ poll: req.body.poll }, function (err, questions) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(questions);
  });
};

// Get a single question
exports.show = function(req, res) {
  Question.findOne({ _id: req.params.id, poll: req.body.poll }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    return res.json(question);
  });
};

// Creates a new question in the DB.
exports.create = function(req, res) {
  if (req.body._id) { delete req.body._id; }
  //if (req.body.choices) { delete req.body.choices; }

  Question.create(req.body, function(err, question) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(question);
  });
};

// Updates an existing question in the DB.
exports.update = function(req, res) {
  if (req.body._id) { delete req.body._id; }
  if (req.body.choices) { delete req.body.choices; }

  Question.findOne({ _id: req.params.id, poll: req.body.poll }, function (err, question) {
    if (err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    var updated = _.merge(question, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(question);
    });
  });
};

// Deletes a question from the DB.
exports.destroy = function(req, res) {
  Question.findOne({ _id: req.params.id, poll: req.body.poll }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    question.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

// Deletes all questions from the DB.
exports.destroyAll = function (req, res) {
  Question.remove({}, function (err) {
    if(err) handleError(err, res);
    return res.status(200).send('No Content');
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
