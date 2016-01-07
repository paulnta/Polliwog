/**
 * Created by paulnta on 20.12.15.
 */

var should = require('should'),
  mongoose = require('mongoose'),
  Poll = require('../poll/poll.model'),
  Question = require('./question.model'),
  init = require('../../components/utils/utils').createUserAndLecture;


var lectureId = null;
var pollId = null;

describe('Question model', function () {

  before(function (done) {
    init(function (err, lecture) {
      if(err) done(err);
      lectureId = lecture._id;
      done();
    });
  });

  beforeEach(function (done) {
    Poll.create({
      lecture: lectureId,
      title: 'Fake poll'
    }, function (err, poll) {
      if(err) done(err);
      pollId = poll._id;
      done();
    });
  });


  it('should save question', function (done) {
    Question.create({
      poll: pollId,
      title: 'fake question'
    }, function (err, question) {
      question.should.have.property('_id');
      question.title.should.eql('fake question');
      Poll.findById(pollId, function (err, poll) {
        poll.questions.should.be.an.Array;
        poll.questions.should.have.length(1);
        done();
      });
    });
  });

});
