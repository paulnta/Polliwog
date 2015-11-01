/**
 * poll.controller.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 *
 * This module implements and exports HTTP controllers
 * responding to HTTP methods on polls:
 *
 *  - index  -> GET all
 *  - show   -> GET single
 *  - create -> POST
 *  - update -> PUT/PATCH
 *  - delete -> DELETE
 */

'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');

/**
 * Get list of polls
 */
exports.index = function (req, res) {
  Poll.find(function (err, polls) {
    if(err) { return handleError(res, err); }
    /*
     * Build URLs references
     */
    for (var j = polls.length - 1; j >= 0; j--) {
      for (var i = polls[j].questions.length - 1; i >= 0; i--) {
        polls[j].questions[i] = req.url + '/' + polls[j]._id + '/questions/' + polls[j].questions[i];
      }
      for (var i = polls[j].participations.length - 1; i >= 0; i--) {
        polls[j].participations[i] = req.url + '/' + polls[j]._id + '/participations/' + polls[j].participations[i];
      }
    }
    return res.status(200).json(polls);
  });
};

/** 
 * Get a single poll
 */
exports.show = function (req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    /*
     * Build URLs references
     */
    for (var i = poll.questions.length - 1; i >= 0; i--) {
      poll.questions[i] = req.url + '/questions/' + poll.questions[i];
    }
    for (var i = poll.participations.length - 1; i >= 0; i--) {
      poll.participations[i] = req.url + '/participations/' + poll.participations[i];
    }
    return res.json(poll);
  });
};

/*
 * Creates a new poll in the DB.
 */
exports.create = function (req, res) {
  if(req.body.questions) { delete req.body.questions; }
  if(req.body.participations) { delete req.body.participations; }
  Poll.create(req.body, function (err, poll) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(poll);
  });
};

/*
 * Updates an existing poll in the DB.
 */
exports.update = function (req, res) {
  /*
   * Removes potential dangerous attributes values in order to
   * prevent from database consistency corruption.
   */
  if(req.body._id) { delete req.body._id; }
  if(req.body.questions) { delete req.body.questions; }
  if(req.body.participations) { delete req.body.participations; }
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    var updated = _.merge(poll, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      /*
       * Build URLs references
       */
      for (var i = poll.questions.length - 1; i >= 0; i--) {
        poll.questions[i] = req.url + '/questions/' + poll.questions[i];
      }
      for (var i = poll.participations.length - 1; i >= 0; i--) {
        poll.participations[i] = req.url + '/participations/' + poll.participations[i];
      }
      return res.status(200).json(poll);
    });
  });
};

/* 
 * Deletes a poll from the DB.
 */
exports.destroy = function (req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    poll.remove(function (err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

/*
 * Returns internal error description
 */
function handleError(res, err) {
  return res.status(500).send(err);
}