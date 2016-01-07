'use strict';

var async = require('async'),
  should = require('should'),
  mongoose = require('mongoose'),
  Poll = require('../poll/poll.model'),
  Question = require('../question/question.model'),
  Choice = require('../choice/choice.model'),
  init = require('../../components/utils/utils').createUserAndLecture;

var lectureId = null;
var pollId = null;
var questionId = null;

describe('Choice model', function() {

  // create user and lecture
  before(function (done) {
    init(function (err, lecture) {
      if(err) done(err);
      lectureId = lecture._id;
      done();
    });
  });

  // create poll and question
  beforeEach(function (done) {
    Poll.create({
      lecture: lectureId,
      title: 'Fake poll'
    }, function (err, poll) {
      pollId = poll._id;
      done();
    });
  });

  it('should save question with choices', function (done) {
    var Choice = mongoose.model('Choice');
    var choice = new Choice({
      key: 'A',
      text: 'fake choice'
    });

    Question.create({
      poll: pollId,
      title: 'fake question',
      choices: [choice]
    }, function (err, question) {
      if(err) done(err);
      question.choices.should.be.an.Array;
      question.choices.should.have.length(1);
      questionId = question._id;
      done();
    });
  });

  it('should add choice to an existing question', function (done) {
    Question.findById(questionId, function (err, question) {
      if(err) {done(err);}
      question.should.have.property('_id');
      question.choices.push({key: 'B', text: 'fake choice'});
      question.save(function (err, question) {
        question.choices.should.have.length(2);
        question.choices[1].key.should.eql('B');
        done();
      });
    });
  });


  it('should remove a choice from an existing question', function (done) {
    Question.findById(questionId, function (err, question) {
      if(err) {done(err);}
      question.choices.splice(1, 1);
      question.save(function (err, question) {
        if(err) {done(err);}
        question.choices.should.have.length(1);
        question.choices[0].should.have.property('key')
          .which.eql('A');
        done();
      });
    });
  });
});
