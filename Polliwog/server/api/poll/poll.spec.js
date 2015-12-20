'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model');
var Lecture = require('../lecture/lecture.model');
var Q = require('q');
var _ = require('lodash');
var Poll = require('../poll/poll.model');
var userId = null;
var lectureId = null;

var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});

var auth = {};

describe('GET /api/lectures/:lecture_id/polls', function() {

  before(function (done) {
    Q.all(_.invoke([Poll, User, Lecture], 'remove')).then(function (products) {
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
  });

  it('should sign in', function (done) {
    request(app)
      .post('/auth/local')
      .send({email: user.email, password: user.password})
      .expect(200)
      .end(function (err, res) {
        if(err) done(err);
        res.body.should.have.property('token');
        auth = {Authorization: 'Bearer ' + res.body.token};
        done();
      })
  });

  it('should save a poll with questions', function (done) {

    var poll = {
      title: 'poll with question',
      questions: [
        {title: 'question 1'},
        {title: 'question 2'}
      ]
    };

    request(app)
      .post('/api/lectures/' + lectureId + '/polls')
      .set(auth)
      .send(poll)
      .expect(200)
      .end(function (err, res) {
        res.body.should.have.property('questions');
        res.body.questions.should.have.length(2);
        done();
      });
  });



});
