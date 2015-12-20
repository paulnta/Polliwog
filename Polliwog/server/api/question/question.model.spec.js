/**
 * Created by paulnta on 20.12.15.
 */

var _ = require('lodash'),
  async = require('async'),
  should = require('should'),
  Poll = require('../poll/poll.model'),
  Question = require('./question.model'),
  init = require('../../components/utils/utils').createUserAndLecture;
var User = require('./../user/user.model');
var Lecture = require('./../lecture/lecture.model');
var Q = require('q');


var poll = {};

describe.only('Question model', function () {

  before(function (done) {
    init('my user', 'my lecture', function (err,lecture) {
      if(err) console.log(err);
      console.log('created by utils : \n' + lecture);
      done();
    });
  });

  //after(function (done) {
  //  Q.all(_.invoke([Poll, User, Lecture], 'remove')).then(function (products) {
  //    done();
  //  });
  //});

  it('should save question', function (done) {
    (true).should.be.ok;
    done();
  });
});
