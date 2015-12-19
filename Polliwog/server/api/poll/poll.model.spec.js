'use strict';

var should = require('should');
var _ = require('lodash');
var Q = require('q');
var app = require('../../app');
var request = require('supertest');
var Poll = require('./poll.model');
var Lecture = require('./../lecture/lecture.model');
var User = require('./../user/user.model');

var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});

var userId = null;
var lectureId = null;

describe('Poll model', function() {

  before(function (done) {
      user.save(function (err, user) {
        userId = user._id;
        Lecture.create({
          name: 'lecture test',
          description: 'lecture test desc',
          speaker: user._id
        }, function (err, lecture) {
          lectureId = lecture._id;
          done();
        });
      });
  });

  after(function (done) {
    Q.all(_.invoke([Poll, User, Lecture], 'remove')).then(function (products) {
      console.log(products.length);
      done();
    });
  });

  it('should save a simple poll and update lecture', function (done) {

    var poll =  new Poll({
      lecture: lectureId,
      title: 'test poll'
    });

    poll.save(function (err, poll) {
      Lecture.findOne({_id: lectureId}, function (err, lecture) {
        lecture.polls.should.have.length(1);
        lecture.polls.should.containEql(poll._id);
        done();
      });
    });

  });

  it('should save a poll with questions', function (done) {

    var poll = new Poll({
      lecture: lectureId,
      title: 'poll with question',
      questions: [
        {title: 'question 1'},
        {title: 'question 2'}
      ]
    });

    poll.save(function (err, poll) {
      poll.questions.should.have.length(2);
    });

  });

});
