/**
 * Created by paulnta on 11.12.15.
 */

var
  _ = require('underscore'),
  copilot = require('api-copilot'),
  Lecture = require('./lecture/lecture.model'),
  Question = require('./question/question.model'),
  Choice = require('./choice/choice.model');

var user = {
  email: 'speaker@speaker.com',
  password: 'speaker'
};

var lectures = [
  {name: 'Web Technologies', description: 'A lecture about web technologies'},
  {name: 'Probability', description: 'We love maths '},
  {name: 'Computer Sciences', description: 'We love computers '}
];

var ids_lecture  = [];
var ids_polls = [];
var ids_questions = [];

var polls = [
  {title:'Test 1'}, {title:'Test 2'}, {title:'Test 3'},
  {title:'Test 4'}, {title:'Test 5'}, {title:'Test 6'},
  {title:'Test 7'}, {title:'Test 8'}, {title:'Test 9'}
];

var questions = [
  {title: 'question 1'}, {title: 'question 2'}, {title: 'question 3'},
  {title: 'question 1'}, {title: 'question 2'}, {title: 'question 3'},
  {title: 'question 1'}, {title: 'question 2'}, {title: 'question 3'},

  {title: 'question 1'}, {title: 'question 2'}, {title: 'question 3'},
  {title: 'question 1'}, {title: 'question 2'}, {title: 'question 3'},
  {title: 'question 1'}, {title: 'question 2'}, {title: 'question 3'},

  {title: 'question 1'}, {title: 'question 2'}, {title: 'question 3'},
  {title: 'question 1'}, {title: 'question 2'}, {title: 'question 3'},
  {title: 'question 1'}, {title: 'question 2'}, {title: 'question 3'}
];

var choices = [
  {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'},
  {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'},
  {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'},

  {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'},
  {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'},
  {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'},

  {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'},
  {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'},
  {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}
];

var scenario = new copilot.Scenario({
  name: 'Init',
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

scenario.step('Remove all Lectures', function () {
  var urls = ['lectures'];
  var requests = _.map(urls, function (url) {
    return this.delete({
      url: '/api/'+url
    });
  }, this);
  return this.all(requests);
});

scenario.step('Handle responses', function (responses) {
  responses = _.pluck(responses, 'body');
  console.log(responses);
});

/**
* Create Lectures
*/
scenario.step('create lectures', function () {
  var requests = _.map(lectures, function (data) {
    return this.post({
      url: '/api/lectures',
      body: data
    })
  }, this);
  return this.all(requests);
});

/**
* Get Lecture ids
*/
scenario.step('show created data', function(responses) {
  var lectures = _.pluck(responses, 'body');

  console.log(lectures.length + ' lectures created:');

  _.each(lectures, function(lecture) {
    console.log('- ' + lecture.name + ' id: ' + lecture._id);
    ids_lecture.push(lecture._id);
  });
});

//scenario.step('Remove all Lectures', function () {
//  var urls = ['lectures' /*, 'polls', 'questions', 'choices'*/];
//  var requests = _.map(urls, function (url) {
//    return this.delete({
//      url: '/api/'+url
//    });
//  }, this);
//  return this.all(requests);
//});
//
//scenario.step('Handle responses', function (responses) {
//  responses = _.pluck(responses, 'body');
//  console.log(responses);
//});
//



/**
* Create Polls
*/
scenario.step('create polls', function () {
  var i = 0;
  var requests = _.map(polls, function (data) {
    var url = '/api/lectures/'+ ids_lecture[i % ids_lecture.length] + '/polls';
    i++;
    return this.post({
      url: url,
      body: data
    })
  }, this);
  return this.all(requests);
});


scenario.step('show created polls', function(responses) {
  var polls = _.pluck(responses, 'body');
  console.log(polls.length + ' polls created:');
  _.each(polls, function(poll) {
    console.log('- ' + poll.title + ' id: ' + poll._id);
    ids_polls.push(poll._id);
  });
});


scenario.step('create questions', function () {
  var i = 0;
  var requests = _.map(questions, function (data) {
    var url = '/api/lectures/'+ ids_lecture[i % ids_lecture.length] + '/polls/' + ids_polls[i % ids_polls.length] + '/questions';
    i++;
    return this.post({
      url: url,
      body: data
    })
  }, this);
  return this.all(requests);

});

scenario.step('show created questions', function(responses) {
  var questions = _.pluck(responses, 'body');

  console.log(questions.length + ' questions created:');
  _.each(questions, function(question) {
    console.log('- ' + question.title + ' id: ' + question._id + ' pollid: ' + question.poll);
    ids_questions.push(question._id);
  });
});

scenario.step('create choices', function () {

  var i = 0;
  var requests = _.map(choices, function (data) {
    var url = '/api/lectures/'+ ids_lecture[i % ids_lecture.length] + '/polls/' + ids_polls[i % ids_polls.length] + '/questions/' + ids_questions[i % ids_questions.length] + '/choices';
    i++;
    return this.post({
      url: url,
      body: data
    })
  }, this);
  return this.all(requests);
});


scenario.step('show created choices', function(responses) {
  var choices = _.pluck(responses, 'body');
  console.log(choices.length + ' choices created:');
  var i = 0;
  _.each(choices, function(choice) {
    console.log('- ' + choice.text + ' id: ' + choice._id);
    i++;
  });
});

module.exports = scenario;
