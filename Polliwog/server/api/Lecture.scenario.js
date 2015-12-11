/**
 * Created by paulnta on 11.12.15.
 */

var copilot = require('api-copilot');
var _ = require('underscore');
var Lecture = require('./lecture/lecture.model');
var user = {
  email: 'speaker@speaker.com',
  password: 'speaker'
};

var lectures = [
  {name: 'Web Technologies', description: 'A lecture about web technologies'},
  {name: 'Probability', description: 'We love maths '},
  {name: 'Computer Sciences', description: 'We love computers '}
];

var polls = [
  {title:'Test 1'},
  {title:'Poll 2'},
  {title:'Poll 3'}
];

var question = [


];

var scenario = new copilot.Scenario({
  name: 'Lectures',
  summary: 'Generated sample lectures',
  baseUrl: 'http://localhost:9000',
  defaultRequestOptions: {
    json: true
  }
});

scenario.step('Send credentials', function () {
  return this.post({
    url: '/auth/local',
    body: {
      email: user.email,
      password: user.password
    }
  })
});

scenario.step('Handle login data', function (response) {
  if(response.body.token) {
    this.extendDefaultRequestOptions({
      headers: {
        Authorization: 'Bearer ' + response.body.token
      }
    });
  } else {
    this.fail('unable to login');
  }
});

scenario.step('remove all lectures', function () {
  Lecture.remove({}).exec();
});

scenario.step('create lectures', function () {
  var requests = _.map(lectures, function (data) {
    return this.post({
      url: '/api/lectures',
      body: data
    })
  }, this);
  return this.all(requests);
});


scenario.step('show created data', function(responses) {

  var lectures = _.pluck(responses, 'body');

  console.log(lectures.length + ' lectures created:');
  var i = 0;
  _.each(lectures, function(lecture) {
    console.log('- ' + lecture.name);
    polls[i].lecture = lecture._id;
    console.log('  - ' + polls[i].title  +' :' + polls[i].lecture);
    i++;
  });

});

scenario.step('create polls', function () {
  var requests = _.map(polls, function (data) {
    return this.post({
      url: '/api/lectures/'+ data.lecture + '/polls',
      body: data
    })
  }, this);
  return this.all(requests);
});


module.exports = scenario;
