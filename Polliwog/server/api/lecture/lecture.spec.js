'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
//var session = require('supertest-session');

var testSession = null;

describe('GET /api/lectures', function() {

  //beforeEach(function () {
  //  testSession = session(app);
  //});

  it('should fail accessing a restricted page', function (done) {
    request(app)
      .get('/api/lectures')
      .expect(401)
      .end(done);
  });


  //it('should sign in', function (done) {
  //  testSession
  //    .post('/auth/local')
  //    .send({email: 'speaker@speaker.com', password: 'speaker'})
  //    .expect(200)
  //    .end(done);
  //});

});
