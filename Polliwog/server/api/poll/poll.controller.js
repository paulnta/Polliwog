'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');

// Get list of polls
exports.index = function(req, res) {
  Poll.find({ lecture: req.body.lecture })
    .populate('questions')
    .exec(function (err, docs) {
      if(err) { return handleError(res, err); }
      Poll.populate(docs, {
        path: 'questions.choices',
        model: 'Choice'
      }, function (err, polls) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(polls);
      });
    });
};


// Get a single poll
exports.show = function(req, res) {
  Poll.findOne({ _id: req.params.id, lecture: req.body.lecture })
    .populate('questions')
    .exec(function (err, doc) {
      if(err) { return handleError(res, err)}

      Poll.populate(doc, {
        path: 'questions.choices',
        model: 'Choice'
      },function (err, poll) {
        if(err) { return handleError(res, err); }
        if(!poll) { return res.status(404).send('Not Found'); }
        return res.json(poll);
      })
    });
};

// Creates a new poll in the DB.
exports.create = function(req, res) {
  if (req.body._id) { delete req.body._id; }
  if (req.body.creationDate) { delete req.body.creationDate; }
  if (req.body.questions) { delete req.body.questions; }

  Poll.create(req.body, function(err, poll) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(poll);
  });
};

// Updates an existing poll in the DB.
exports.update = function(req, res) {
  if (req.body._id) { delete req.body._id; }
  if (req.body.creationDate) { delete req.body.creationDate; }
  if (req.body.questions) { delete req.body.questions; }

  Poll.findOne({ _id: req.params.id, lecture: req.body.lecture }, function (err, poll) {
    if (err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    var updated = _.merge(poll, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(poll);
    });
  });
};

// Deletes a poll from the DB.
exports.destroy = function(req, res) {
  Poll.findOne({ _id: req.params.id, lecture: req.body.lecture }, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    poll.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

// Deletes all polls from the DB.
exports.destroyAll = function (req, res) {
  Poll.remove({}, function (err) {
    if(err) handleError(err, res);
    return res.status(200).send('No Content');
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
