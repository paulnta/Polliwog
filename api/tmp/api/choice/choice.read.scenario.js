/**
 * choice.read.scenario.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 */

var copilot = require('api-copilot');
var _       = require('underscore');

var scenario = new copilot.Scenario({ 
  name: 'Choice C READ UD',
  summary: 'Test choice C READ UD.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

var pollData = { 
  title: 'api-copilot' 
};

var questionData = { 
  title: 'What is a scenario ?',
  type: 'reminder' 
};

var choicesData = [
  { key: 'a', text: 'A setting, in particular for a work of art or literature.' },
  { key: 'b', text: 'A series of steps that are executed in order using the "step" method.' },
  { key: 'c', text: 'A written outline of a film, novel, or stage work giving details of the plot and individual scenes.' }
];

var poll = {};
var question = {};

scenario.step('create a poll', function() {
  return this.post({
    body: pollData,
    expect: {
      statusCode: 201,
    }
  });
});

scenario.step('log created poll', function(response) {
  poll = response.body;
  if (poll.title !== 'api-copilot' || poll.state !== 'drafti') {
    return this.fail('created poll does not match');
  }
  console.log(poll);
});

scenario.step('create a question', function() {
  return this.post({
    url: '/' + poll._id + '/questions',
    body: questionData,
    expect: {
      statusCode: 201
    }
  });
});

scenario.step('log created question', function(response) {
  question = response.body;
  if (question.title !== 'What is a scenario ?' || question.type !== 'reminder') {
    return this.fail('created question does not match');
  }
  console.log(question);
});

scenario.step('create choices',  function()  { 
  var requests = []; 

  for (var i = choicesData.length - 1; i >= 0; i--) {
    requests.push(this.post({ 
      url: '/' + question.poll + '/questions/' + question._id + '/choices',
      body: choicesData[i],
      expect: { statusCode: 201 }
    }));
  }

  return this.all(requests); 
});

scenario.step('log created choices', function(responses) {

  var choices = _.pluck(responses, 'body');

  console.log(choices.length + ' choices created:');
  _.each(choices, function(choice) { console.log(choice); });

  return choices;
});

scenario.step('read all choices', function(choices) { 
  return this.get({
    url: '/' + poll._id + '/questions/' + question._id + '/choices',
    expect: {
      statusCode: 200,
    }
  }); 
});

scenario.step('log all read choices', function(response) {
 
  var choices = response.body;

  console.log(choices.length + ' choices read:');
  console.log(choices);

  return choices;
});

scenario.step('read choices', function(choices)  { 
  var requests = []; 

  for (var i = choices.length - 1; i >= 0; i--) {
    requests.push(this.get({ 
      url: '/' + poll._id + '/questions/' + choices[i].question + '/choices/' + choices[i]._id,
      expect: { statusCode: 200 }
    }));
  }

  return this.all(requests); 
});

scenario.step('log read choices', function(responses) {
  console.log(responses.length + ' choices read:');
  _.each(responses, function(response) { console.log(response.body); });
});

module.exports = scenario;