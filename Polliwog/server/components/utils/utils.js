/**
 * Created by paulnta on 20.12.15.
 */


var async = require('async'),
    User = require('../../api/user/user.model'),
    Poll = require('../../api/poll/poll.model'),
    Lecture = require('../../api/lecture/lecture.model'),
    _ = require('lodash'),
    Q = require('q');


exports.createUserAndLecture = function (user, lecture, callback) {
  async.waterfall([

    // remove
    function (callback) {
      Q.all(_.invoke([User, Poll, Lecture], 'remove'))
        .then(function () {
          callback(null);
        });
    },

    // create user
    function (callback) {
      User.create({
        provider: 'local',
        name: 'Fake User',
        email: 'test@test.com',
        password: 'password'
      },callback);
    },

    // create lecture
    function (user, callback) {
      console.log('user: ' + user);
      Lecture.create({
        name: 'Fake Lecture',
        description: 'lecture for tests',
        speaker: user._id
      }, callback);
    }
  ], function (err, lecture) {
    callback(err, lecture);
  });
};
