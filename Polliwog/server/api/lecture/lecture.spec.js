'use strict';

var should = require('should'),
    app = require('../../app'),
    User = require('../user/user.model'),
    request = require('supertest');

var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});

var auth = {};

describe('GET /api/lectures', function() {

  before(function (done) {
    user.save(function () {
      done();
    });
  });

  after(function (done) {
    User.remove().exec().then(function () {
      done();
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

});
