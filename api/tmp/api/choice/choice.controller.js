'use strict';

var _ = require('lodash');
var Choice = require('./choice.model');
var Question = require('../question/question.model');

// Get list of choices
exports.index = function (req, res) {
  Question.findOne({ _id: req.params.question_id, poll: req.params.poll_id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    Choice.find({ question: req.params.question_id }, function (err, choices) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(choices);
    });
  });
};

// Get a single choice
/*
exports.show = function (req, res) {
  Question.findOne({ _id: req.params.question_id, poll: req.params.poll_id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    Choice.findOne({ _id: req.params.id, question: req.params.question_id }, function (err, choice) {
      if(err) { return handleError(res, err); }
      if(!choice) { return res.status(404).send('Not Found'); }
      return res.json(choice);
    });
  });
};
*/
// Get a single choice -> TODO: Test
exports.show = function (req, res) {
  Question.findOne({ _id: req.params.question_id, poll: req.params.poll_id, req.params.question_id: { $in: choices } }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    Choice.findById(req.params.id, function (err, choice) {
      if(err) { return handleError(res, err); }
      if(!choice) { return res.status(404).send('Not Found'); }
      return res.json(choice);
    });
  });
};

// Creates a new choice in the DB.
exports.create = function (req, res) {
  Question.findOne({ _id: req.params.question_id, poll: req.params.poll_id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    if(req.body.answers) { delete req.body.answers; }
    req.body.question = req.params.question_id;
    Choice.create(req.body, function (err, choice) {
      if(err) { return handleError(res, err); }
      return res.status(201).json(choice);
    });
  });
};

// Updates an existing choice in the DB.
exports.update = function (req, res) {
  Question.findOne({ _id: req.params.question_id, poll: req.params.poll_id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    if(req.body._id) { delete req.body._id; }
    if(req.body.question) { delete req.body.question; }
    if(req.body.answers) { delete req.body.answers; }
    Choice.findOne({ _id: req.params.id, question: req.params.question_id }, function (err, choice) {
      if (err) { return handleError(res, err); }
      if(!choice) { return res.status(404).send('Not Found'); }
      var updated = _.merge(choice, req.body);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(choice);
      });
    });
  });
};

// Deletes a choice from the DB.
exports.destroy = function (req, res) {
  Question.findOne({ _id: req.params.question_id, poll: req.params.poll_id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    Choice.findOne({ _id: req.params.id, question: req.params.question_id }, function (err, choice) {
      if(err) { return handleError(res, err); }
      if(!choice) { return res.status(404).send('Not Found'); }
      choice.remove(function (err) {
        if(err) { return handleError(res, err); }
        return res.status(204).send('No Content');
      });
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}