/**
 * Created by paulnta on 07.01.16.
 */

var
  User = require('../user/user.model'),
  Lecture = require('./lecture.model'),
  should = require('should'),
  util = require('../../components/utils/utils');

var userId = null;
var lectureId = null;

describe('Lecture model', function () {

  // create a user
  before(function(done) {
    // Clear users before testing
    util.initUser(function (err, user) {
      userId = user._id;
      done();
    });
  });


  // create a new lecture
  beforeEach(function (done) {
    var lecture = new Lecture({
      speaker: userId,
      name: 'test lecture 1',
      description: 'test lecture 1'
    });

    Lecture.remove().then(function () {
      lecture.save(function (err, lecture) {
        if(err) done(err);
        lectureId = lecture._id;
        done();
      });
    });
  });

  it('should add a slug when saving a lecture', function (done) {
    Lecture.findById(lectureId, function(err, lecture) {
      if(err) done(err);
      lecture.should.have.property('slug')
        .which.eql('test-lecture-1');
      done();
    })
  });

  it('should update slug when lecture is modified', function (done) {
    Lecture.findById(lectureId, function (err, lecture) {
      if(err) {done(err);}
      lecture.name = 'new lecture\'s name';
      lecture.save(function(err, lecture){
        if(err) {done(err);}
        lecture.slug.should.eql('new-lectures-name');
        done();
      });
    });
  });

});
