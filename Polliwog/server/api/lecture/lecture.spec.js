'use strict';

var should = require('should'),
    Lecture = require('./lecture.model'),
    app = require('../../app'),
    User = require('../user/user.model'),
    request = require('supertest'),
    init = require('../../components/utils/utils').createUserAndLecture;

var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});

var auth = {};
var lectureId = null;

describe('GET /api/lectures', function() {

  // create user and lecture
  before(function (done) {
    init(function (err, lecture) {
      if(err) done(err);
      lectureId = lecture._id;
      done();
    });
  });

  after(function (done) {
    User.remove().exec().then(function () {
      Lecture.remove().exec().then(function () {
        done();
      });
    });
  });

  it('should fail accessing a restricted page', function (done) {
    request(app)
      .get('/api/lectures')
      .expect(401)
      .end(done);
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

  it('should get lecture list when signed in', function (done) {
    request(app)
      .get('/api/lectures')
      .set(auth)
      .expect(200)
      .end(function (err, res) {
        if(err) done(err);
        res.body.should.be.an.Array;
        done();
      });
  });


  it('should get lecture by id', function (done) {
    console.log(lectureId);
    request(app)
      .get('/api/lectures/' + lectureId)
      .set(auth)
      .expect(200)
      .end(function (err, res) {
        if(err) {done(err);}
        res.body.name.should.be.eql('Fake Lecture');
        done();
      });
  });


  it('should get lecture by slug', function (done) {
    console.log(lectureId);
    request(app)
      .get('/api/lectures/Fake-Lecture?slug=true')
      .set(auth)
      .expect(200)
      .end(function (err, res) {
        if(err) {done(err);}
        res.body.should.be.ok;
        res.body.slug.should.be.eql('Fake-Lecture');
        done();
      });
  });


});
