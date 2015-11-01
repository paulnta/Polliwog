/**
 * answer.delete.scenario.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 */

var copilot = require('api-copilot');
var _       = require('underscore');

var scenario = new copilot.Scenario({ 
  name: 'Answer CRU DELETE',
  summary: 'Test answer CRU DELETE.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

var pollData = { 
  title: 'api-copilot' 
};

var participationData = {
	participant: 'yibnl'
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
var participation = {};
var question = {};
var choices = {};

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

scenario.step('create a participation', function() {
  return this.post({
    url: '/' + poll._id + '/participations',
    body: participationData,
    expect: {
      statusCode: 201
    }
  });
});

scenario.step('log created participation', function(response) {
  participation = response.body;
  if (participation.participant !== 'yibnl') {
    return this.fail('created participation does not match');
  }
  console.log(participation);
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

  choices = _.pluck(responses, 'body');

  console.log(choices.length + ' choices created:');
  _.each(choices, function(choice) { console.log(choice); });

});

scenario.step('create an answer', function() { 
	return this.post({
    url: '/' + poll._id + '/participations/' + participation._id + '/answers?question=' + question._id + '&choice=' + choices[0]._id,
    expect: {
      statusCode: 201
    }
  });
});

scenario.step('log created answer', function(response) {
	var answer = response.body;
  if (answer.choice !== choices[0]._id || answer.participation !== participation._id) {
    return this.fail('created answer does not match');
  }
  console.log(answer);
  return answer;
});

scenario.step('delete answer', function(answer) {
	return this.delete({ 
    url:  '/' + poll._id + '/participations/' + participation._id + '/answers/' + answer._id,
		expect: { statusCode: 204 }
	});
});

scenario.step('log deleted answer', function(response) {
	console.log(response.statusMessage);
});

module.exports = scenario;