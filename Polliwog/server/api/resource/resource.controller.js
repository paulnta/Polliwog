'use strict';

var _ = require('lodash');
var Resource = require('./resource.model');

// Get list of resources
exports.index = function (req, res) {
  Resource.find({ lecture: req.body.lecture }, function (err, resources) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(resources);
  });
};

// Get a single resource
exports.show = function (req, res) {
  Resource.findOne({_id: req.params.id, lecture: req.body.lecture }, function (err, resource) {
    if (err) { return handleError(res, err); }
    if (!resource) { return res.status(404).send('Not Found'); }
    return res.json(resource);
  });
};

// Creates a new resource in the DB.
exports.create = function (req, res) {
  if (req.body.creationDate) { req.body.creationDate; }
  Resource.create(req.body, function (err, resource) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(resource);
  });
};

// Updates an existing resource in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  if (req.body.creationDate) { req.body.creationDate; }
  Resource.findOne({_id: req.params.id, lecture: req.body.lecture }, function (err, resource) {
    if (err) { return handleError(res, err); }
    if (!resource) { return res.status(404).send('Not Found'); }
    var updated = _.merge(resource, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(resource);
    });
  });
};

// Deletes a resource from the DB.
exports.destroy = function (req, res) {
  Resource.findOne({_id: req.params.id, lecture: req.body.lecture }, function (err, resource) {
    if (err) { return handleError(res, err); }
    if (!resource) { return res.status(404).send('Not Found'); }
    resource.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}