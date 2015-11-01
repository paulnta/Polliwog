/**
 * participation.controller.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 *
 * This module implements and exports HTTP controllers
 * responding to HTTP methods on participations:
 *
 *  - index  -> GET all
 *  - show   -> GET single
 *  - create -> POST
 *  - update -> PUT/PATCH
 *  - delete -> DELETE
 */

'use strict';

var _ = require('lodash');
var Participation = require('./participation.model');

/**
 * Get list of participations
 */
exports.index = function (req, res) {
  Participation.find({ poll: req.params.poll_id }, function (err, participations) {
    if(err) { return handleError(res, err); }
    // Build URLs references
    for (var j = participations.length - 1; j >= 0; j--) {
      for (var i = participations[j].answers.length - 1; i >= 0; i--) {
        participations[j].answers[i] = req.url + '/' + participations[j]._id + '/answers/' + participations[j].answers[i];
      }
    }
    return res.status(200).json(participations);
  });
};

/**
 * Get a single participation
 */
exports.show = function (req, res) {
  /*
   * Check whether participation belongs to poll.
   */
  Participation.findOne({ _id: req.params.id, poll: req.params.poll_id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    // Build URLs references
    for (var i = participation.answers.length - 1; i >= 0; i--) {
      participation.answers[i] = req.url + '/answers/' + participation.answers[i];
    }
    return res.json(participation);
  });
};

/**
 * Creates a new participation in the DB.
 */
exports.create = function (req, res) {
  req.body.poll = req.params.poll_id;
  if(req.body.answers) { delete req.body.answers; }
  Participation.create(req.body, function (err, participation) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(participation);
  });
};

/**
 * Updates an existing participation in the DB.
 */
exports.update = function (req, res) {
  /*
   * Removes potential dangerous attributes values in order to
   * prevent from database consistency corruption.
   */
  if(req.body._id) { delete req.body._id; }
  if(req.body.poll) { delete req.body.poll; }
  if(req.body.answers) { delete req.body.answers; }
  /*
   * Check whether participation belongs to poll.
   */
  Participation.findOne({ _id: req.params.id, poll: req.params.poll_id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    var updated = _.merge(participation, req.body);
    updated.save(function (err) {
      if(err) { return handleError(res, err); }
      // Build URLs references
      for (var i = participation.answers.length - 1; i >= 0; i--) {
        participation.answers[i] = req.url + '/answers/' + participation.answers[i];
      }
      return res.status(200).json(participation);
    });
  });
};

/**
 * Deletes a participation from the DB.
 */
exports.destroy = function (req, res) {
  /*
   * Check whether participation belongs to poll.
   */
  Participation.findOne({ _id: req.params.id, poll: req.params.poll_id }, function (err, participation) {
    if(err) { return handleError(res, err); }
    if(!participation) { return res.status(404).send('Not Found'); }
    participation.remove(function (err) {
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