'use strict';

var _ = require('lodash');
var rand = require("random-key");
var Session = require('./session.model');

// Get list of sessions
exports.index = function (req, res) {
  Session.find({ speaker: req.user._id }, function (err, sessions) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(sessions);
  });
};

// Get a single session
exports.show = function (req, res) {
  Session.findOne({ _id: req.params.id, speaker: req.user._id }, function (err, session) {
    if (err) { return handleError(res, err); }
    if (!session) { return res.status(404).send('Not Found'); }
    return res.json(session);
  });
};

// Creates a new session in the DB.
exports.create = function (req, res) {
	if (req.body._id) { delete req.body._id; }
	if (req.body.listeners) { delete req.body.listeners; }
	if (req.body.moods) { delete req.body.moods; }
	if (req.body.polls) { delete req.body.polls; }
	if (req.body.resources) { delete req.body.resources; }
	req.body.key = generateKey();
	req.body.speaker = req.user._id;
  Session.create(req.body, function (err, session) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(session);
  });
};

// Updates an existing session in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  if (req.body.key) { delete req.body.key; }
  if (req.body.speaker) { delete req.body.speaker; }
	if (req.body.listeners) { delete req.body.listeners; }
	if (req.body.moods) { delete req.body.moods; }
	if (req.body.polls) { delete req.body.polls; }
	if (req.body.resources) { delete req.body.resources; }
  Session.findOne({ _id: req.params.id, speaker: req.user._id }, function (err, session) {
    if (err) { return handleError(res, err); }
    if (!session) { return res.status(404).send('Not Found'); }
    var updated = _.merge(session, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(session);
    });
  });
};

// Deletes a session from the DB.
exports.destroy = function (req, res) {
  Session.findOne({ _id: req.params.id, speaker: req.user._id }, function (err, session) {
    if (err) { return handleError(res, err); }
    if (!session) { return res.status(404).send('Not Found'); }
    session.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

function generateKey() {
	var available = false;
	var key;
	do {
		key = rand.generate();
		Session.findOne({ key: key}, function (err, session) {
			if (!session) { available = true; }
		});
	} while (!available);
	return key;
}