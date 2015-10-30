'use strict';

var _ = require('lodash');
var Answer = require('./answer.model');
var Participation = require('../participation/participation.model');
var Choice = require('../choice/choice.model');

// Get list of answers
exports.index = function(req, res) {
  Participation.findOne({ _id: req.params.participation_id, poll: req.params.poll_id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    Answer.find({ participation: req.params.participation_id }, function (err, answers) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(answers);
    });
  });
};

// Get a single answer
exports.show = function(req, res) {
	Participation.findOne({ _id: req.params.participation_id, poll: req.params.poll_id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    Answer.findOne({ _id: req.params.id, participation: req.params.question_id }, function (err, answer) {
      if(err) { return handleError(res, err); }
      if(!answer) { return res.status(404).send('Not Found'); }
      return res.json(answer);
    });
  });
};

// Creates a new answer in the DB.
exports.create = function(req, res) {
  Answer.create(req.body, function(err, answer) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(answer);
  });
};

// Updates an existing answer in the DB.
exports.update = function(req, res) {
	if(!req.query.question) { return res.status(404).send('Bad Request'); }
	if(!req.query.choice) { return res.status(404).send('Bad Request'); }
	Participation.findOne({ _id: req.params.participation_id, poll: req.params.poll_id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    Answer.findOne({ _id: req.params.id, participation: req.params.participation_id }, function (err, answer) {
	    if (err) { return handleError(res, err); }
	    if(!answer) { return res.status(404).send('Not Found'); }
	    Question.findOne({ _id: req.query.question, [req.query.choice, answer.choice]: { $in: choices } }, function (err, question) {
	    	if (err) { return handleError(res, err); }
	    	if(!question) { return  res.status(404).send('Bad Request'); }
	    	answer.choice = req.query.choice;
		    answer.save(function (err) {
		      if (err) { return handleError(res, err); }
		      return res.status(200).json(answer);
		    });
	    });
	  });
  });
};

// Deletes a answer from the DB.
exports.destroy = function(req, res) {
	Participation.findOne({ _id: req.params.participation_id, poll: req.params.poll_id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    Answer.findOne({ _id: req.params.id, participation: req.params.participation_id }, function (err, answer) {
	    if(err) { return handleError(res, err); }
	    if(!answer) { return res.status(404).send('Not Found'); }
	    answer.remove(function(err) {
	      if(err) { return handleError(res, err); }
	      return res.status(204).send('No Content');
	    });
	  });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}