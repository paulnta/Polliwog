/**
 * answer.controller.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 *
 * This module implements and exports HTTP controllers
 * responding to HTTP methods on answers:
 *
 *  - index  -> GET all
 *  - show   -> GET single
 *  - create -> POST
 *  - update -> PUT/PATCH
 *  - delete -> DELETE
 */

'use strict';

var _ = require('lodash');
var Answer = require('./answer.model');
var Participation = require('../participation/participation.model');
var Choice = require('../choice/choice.model');

/**
 * Get list of answers
 */
exports.index = function(req, res) {
  /*
   * Check whether participation belongs to poll.
   */
  Participation.findOne({ _id: req.params.participation_id, poll: req.params.poll_id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    Answer.find({ participation: req.params.participation_id }, function (err, answers) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(answers);
    });
  });
};

/**
 * Get a single answer
 */
exports.show = function(req, res) {
  /*
   * Check whether answer belongs to participation which belongs to poll.
   */
	Participation.findOne({ _id: req.params.participation_id, poll: req.params.poll_id, answers: req.params.id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    Answer.findById(req.params.id, function (err, answer) {
      if(err) { return handleError(res, err); }
      if(!answer) { return res.status(404).send('Not Found'); }
      return res.json(answer);
    });
  });
};

/**
 * Creates a new answer in the DB.
 */
exports.create = function(req, res) {
  if(!req.query.question) { return res.status(400).send('Bad Request'); }
  if(!req.query.choice) { return res.status(400).send('Bad Request'); }
  /*
   * Check whether participation belongs to poll
   */
  Participation.findOne({ _id: req.params.participation_id, poll: req.params.poll_id }, function(err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    /*
     * Check whether choice belongs to question wich belongs to poll.
     */
    Question.findOne({ _id : req.query.question, poll: req.params.poll_id, choices: req.query.choice }, function (err, question) {
      if(err) { return handleError(res, err); }
      if(!question) { return res.status(404).send('Not Found'); }
      /*
       * Check whether participation already answered question with given choice.
       */
      Answer.findOne({ participation: req.params.participation_id, choice: req.query.choice }, function(err, answer) {
        if(err) { return handleError(res, err); }
        if(answer) { return res.status(409).send('Conflict'); }
        Answer.create({ participation: req.params.participation_id, choice: req.query.choice }, function (err, answer) {
          if(err) { return handleError(res, err); }
          return res.status(201).json(answer);
        });
      });
    });
  });
};

/**
 * Updates an existing answer in the DB.
 */
exports.update = function(req, res) {
	if(!req.query.question) { return res.status(400).send('Bad Request'); }
	if(!req.query.choice) { return res.status(400).send('Bad Request'); }
  /*
   * Check whether answer belong to participation which belongs to poll.
   */
	Participation.findOne({ _id: req.params.participation_id, poll: req.params.poll_id, answers: req.params.id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    Answer.findById(req.params.id, function (err, answer) {
	    if (err) { return handleError(res, err); }
	    if(!answer) { return res.status(404).send('Not Found'); }
      /*
       * Check whether given choice belongs to question.
       * 
       * There is a trick here. The way we check that a choice belongs to a question suppose that the current choice
       * of the answer must belongs to the same question.
       *
       * Therefore the query looks for a question whose choices array contains both old and new choice.
       */
	    Question.findOne({ _id: req.query.question, choices: { $in: [req.query.choice, answer.choice] } }, function (err, question) {
	    	if (err) { return handleError(res, err); }
	    	if(!question) { return  res.status(400).send('Bad Request'); }
	    	answer.choice = req.query.choice;
		    answer.save(function (err) {
		      if (err) { return handleError(res, err); }
		      return res.status(200).json(answer);
		    });
	    });
	  });
  });
};

/**
 * Deletes a answer from the DB.
 */
exports.destroy = function(req, res) {
  /*
   * Check whether the answer belongs to the participation which belongs to the poll.
   */
	Participation.findOne({ _id: req.params.participation_id, poll: req.params.poll_id, answers: req.params.id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    Answer.findById(req.params.id, function (err, answer) {
	    if(err) { return handleError(res, err); }
	    if(!answer) { return res.status(404).send('Not Found'); }
	    answer.remove(function(err) {
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