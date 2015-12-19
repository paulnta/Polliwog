'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/things', function() {

    it('should get things', function (done) {
      request(app)
        .get('/api/things')
        .expect(200)
        .expect(function (res) {
          res.body.should.be.ok;
          res.body.should.be.an.Array;
        })
        .end(done);
    })
});
