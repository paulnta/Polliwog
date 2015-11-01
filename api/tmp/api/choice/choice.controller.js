/**
 * choice.controller.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 *
 * This module implements and exports HTTP controllers
 * responding to HTTP methods on choices:
 *
 *  - index  -> GET all
 *  - show   -> GET single
 *  - create -> POST
 *  - update -> PUT/PATCH
 *  - delete -> DELETE
 */

'use strict';

var _ = require('lodash');
var Choice = require('./choice.model');
var Question = require('../question/question.model');

/**
 * Get list of choices
 */
exports.index = function (req, res) {
  /*
   * Check whether the question belongs to the poll.
   */
  Question.findOne({ _id: req.params.question_id, poll: req.params.poll_id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    Choice.find({ question: req.params.question_id }, function (err, choices) {
      if(err) { return handleError(res, err); }
      for (var j = choices.length - 1; j >= 0; j--) {
        choices[j].populate('answers', function(err, choice) {
          if(err) { return handleError(res, err); }
          /*
           * Build URLs references
           */
          for (var i = choice.answers.length - 1; i >= 0; i--) {
            choice.answers[i] = req.url.substring(0, req.url.indexOf('/questions')) + '/participations/' + choice.answers[i].participation + '/answers/' + choice.answers[i]._id;
          }
        });
      }
      return res.status(200).json(choices);
    });
  });
};

/**
 * Get a single choice
 */
exports.show = function (req, res) {
  /*
   * Check whether choice belongs to question which belongs to poll.
   */
  Question.findOne({ _id: req.params.question_id, poll: req.params.poll_id, choices: req.params.id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    Choice.findById(req.params.id, function (err, choice) {
      if(err) { return handleError(res, err); }
      if(!choice) { return res.status(404).send('Not Found'); }
      /*
       * Populate answers choice field in order to retrieve and build answers URLs from participations IDs.
       */
      choice.populate('answers', function(err, choice) {
        if(err) { return handleError(res, err); }
        /*
         * Build URLs references
         */
        for (var i = choice.answers.length - 1; i >= 0; i--) {
          choice.answers[i] = req.url.substring(0, req.url.indexOf('/questions')) + '/participations/' + choice.answers[i].participation + '/answers/' + choice.answers[i]._id;
        }
        return res.json(choice);
      });
    });
  });
};

/**
 * Creates a new choice in the DB.
 */
exports.create = function (req, res) {
  /*
   * Check whether the question belongs to the poll.
   */
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

/**
 * Updates an existing choice in the DB.
 */
exports.update = function (req, res) {
  /*
   * Check whether choice belongs to question which belongs to poll.
   */
  Question.findOne({ _id: req.params.question_id, poll: req.params.poll_id, choices: req.params.id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    /*
     * Removes potential dangerous attributes values in order to
     * prevent from database consistency corruption.
     */
    if(req.body._id) { delete req.body._id; }
    if(req.body.question) { delete req.body.question; }
    if(req.body.answers) { delete req.body.answers; }
    Choice.findById(req.params.id, function (err, choice) {
      if (err) { return handleError(res, err); }
      if(!choice) { return res.status(404).send('Not Found'); }
      var updated = _.merge(choice, req.body);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        /*
         * Populate answers choice field in order to retrieve and build answers URLs from participations IDs.
         */
        choice.populate('answers', function(err, choice) {
          if(err) { return handleError(res, err); }
          /*
           * Build URLs references
           */
          for (var i = choice.answers.length - 1; i >= 0; i--) {
            choice.answers[i] = req.url.substring(0, req.url.indexOf('/questions')) + '/participations/' + choice.answers[i].participation + '/answers/' + choice.answers[i]._id;
          }
          return res.status(200).json(choice);
        });
      });
    });
  });
};

/**
 * Deletes a choice from the DB.
 */
exports.destroy = function (req, res) {
  /*
   * Check whether choice belong to question which belongs to poll.
   */
  Question.findOne({ _id: req.params.question_id, poll: req.params.poll_id, choices: req.params.id }, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    Choice.findById(req.params.id, function (err, choice) {
      if(err) { return handleError(res, err); }
      if(!choice) { return res.status(404).send('Not Found'); }
      choice.remove(function (err) {
        if(err) { return handleError(res, err); }
        return res.status(204).send('No Content');
      });
    });
  });
};

/**
 * Returns internal error description
 */
function handleError(res, err) {
  return res.status(500).send(err);
}