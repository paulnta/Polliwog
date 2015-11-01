/**
 * question.controller.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 *
 * This module implements and exports HTTP controllers
 * responding to HTTP methods on questions:
 *
 *  - index  -> GET all
 *  - show   -> GET single
 *  - create -> POST
 *  - update -> PUT/PATCH
 *  - delete -> DELETE
 */

'use strict';

var _ = require('lodash');
var Question = require('./question.model');

/**
 * Get list of questions
 */
exports.index = function (req, res) {
  Question.find({ poll: req.params.poll_id }, function (err, questions) {
    if(err) { return handleError(res, err); }
    /*
     * Build URLs references
     */
    for (var j = questions.length - 1; j >= 0; j--) {
      for (var i = questions[j].choices.length - 1; i >= 0; i--) {
        questions[j].choices[i] = req.url + '/' + questions[j]._id + '/choices/' + questions[j].choices[i];
      }
    }
    return res.status(200).json(questions);
  });
};

/**
 * Get a single question
 */
exports.show = function (req, res) {
  /*
   * Check whether question belongs to poll.
   */
  Question.findOne({ _id: req.params.id, poll: req.params.poll_id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    /*
     * Build URLs references
     */
    for (var i = question.choices.length - 1; i >= 0; i--) {
      question.choices[i] = req.url + '/choices/' + question.choices[i];
    }
    return res.json(question);
  });
};

/**
 * Creates a new question in the DB.
 */
exports.create = function (req, res) {
  /*
   * Removes potential dangerous attributes values in order to
   * prevent from database consistency corruption
   */
  if(req.body.choices) { delete req.body.choices; }
  req.body.poll = req.params.poll_id;
  Question.create(req.body, function (err, question) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(question);
  });
};

/**
 * Updates an existing question in the DB.
 */
exports.update = function (req, res) {
  /*
   * Removes potential dangerous attributes values in order to
   * prevent from database consistency corruption
   */
  if(req.body._id) { delete req.body._id; }
  if(req.body.poll) { delete req.body.poll; }
  if(req.body.choices) { delete req.body.choices; }
  /*
   * Check whether question belongs to poll
   */
  Question.findOne({ _id: req.params.id, poll: req.params.poll_id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    var updated = _.merge(question, req.body);
    updated.save(function (err) {
      if(err) { return handleError(res, err); }
      /*
       * Build URLs references
       */
      for (var i = question.choices.length - 1; i >= 0; i--) {
        question.choices[i] = req.url + '/choices/' + question.choices[i];
      }
      return res.status(200).json(question);
    });
  });
};

/**
 * Deletes a question from the DB.
 */
exports.destroy = function (req, res) {
  /*
   * Check whether question belongs to poll.
   */
  Question.findOne({ _id: req.params.id, poll: req.params.poll_id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    question.remove(function (err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

/**
 * Returns internal error description
 */
function handleError(res, err) {
  return res.status(500).send(err);
}