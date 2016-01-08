/**
 * Created by paulnta on 07.01.16.
 */

var
  User = require('../user/user.model'),
  Lecture = require('./lecture.model'),
  should = require('should');

var userId = null;
var lectureId = null;

describe('Lecture model', function () {

  before(function(done) {
    // Clear users before testing
    User.remove().exec().then(function() {
      User.create({
        name: 'test',
        email: 'test@test.com',
        password: 'test'
      }, function (err, user) {
        if(err) {done(err);}
        userId = user._id;
        done();
      });
    });
  });

  after(function(done) {
    User.remove().exec().then(function() {
      Lecture.remove().exec().then(function () {
        done();
      });
    });
  });

  it('should add a slug when saving a lecture', function (done) {

    var lecture = new Lecture({
      speaker: userId,
      name: 'test lecture 1',
      description: 'test lecture 1'
    });

    lecture.save(function (err, lecture) {
      if(err) {done(err);}
      lectureId = lecture._id;
      lecture.should.have.property('slug')
        .which.eql('test-lecture-1');
      done();
    });
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

  it.skip('should update slug when lecture is updated', function (done) {
    Lecture.findByIdAndUpdate(
      lectureId, {name: 'updated name'}, {new: true},
      function (err, lecture) {
        if(err) {done(err);}
        console.log(lecture);
        lecture.name.should.eql('updated name');
        lecture.slug.should.eql('updated-name');
        done();
      })
  });

});
