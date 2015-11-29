'use strict';

var _ = require('lodash');
var Session = require('./session.model');

// Get list of sessions
exports.index = function(req, res) {
  Session.find(function (err, sessions) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(sessions);
  });
};

// Get a single session
exports.show = function(req, res) {
  Session.findById(req.params.id, function (err, session) {
    if(err) { return handleError(res, err); }
    if(!session) { return res.status(404).send('Not Found'); }
    return res.json(session);
  });
};

// Creates a new session in the DB.
exports.create = function(req, res) {
  Session.create(req.body, function(err, session) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(session);
  });
};

// Updates an existing session in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Session.findById(req.params.id, function (err, session) {
    if (err) { return handleError(res, err); }
    if(!session) { return res.status(404).send('Not Found'); }
    var updated = _.merge(session, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(session);
    });
  });
};

// Deletes a session from the DB.
exports.destroy = function(req, res) {
  Session.findById(req.params.id, function (err, session) {
    if(err) { return handleError(res, err); }
    if(!session) { return res.status(404).send('Not Found'); }
    session.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}