/**
 * Created by paulnta on 07.01.16.
 */

var
  User = require('../user/user.model'),
  Lecture = require('./lecture.model'),
  should = require('should');

var userId = null;
describe.only('Lecture model', function () {

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
      if(err) {
        console.log(err);
        done(err);
      }
      lecture.should.have.property('slug')
        .which.eql('test-lecture-1');
      done();
    });

  });

});
