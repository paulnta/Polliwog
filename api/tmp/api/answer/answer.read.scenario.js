/**
 * answer.read.scenario.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 */

var copilot = require('api-copilot');
var _       = require('underscore');

var scenario = new copilot.Scenario({ 
  name: 'Answer C READ UD',
  summary: 'Test answer C READ UD.',
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

var questionsData = [
	{ title: 'What is a scenario ?', type: 'reminder' },
	{ title: 'How do you run a scenario ?', type: 'reminder' }
]

var choicesData = [
	[
	  { key: 'a', text: 'A setting, in particular for a work of art or literature.' },
	  { key: 'b', text: 'A series of steps that are executed in order using the "step" method.' },
	  { key: 'c', text: 'A written outline of a film, novel, or stage work giving details of the plot and individual scenes.' }
	],
	[
	  { key: 'a', text: 'api-copilot run [scenario]' },
	  { key: 'b', text: 'api-copilot [scenario]' },
	  { key: 'c', text: 'None of these' }
	]
];
var poll = {};
var participation = {};
var questions = [];
var choices = [];

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
  console.log(response.statusCode);
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
  console.log(response.statusCode);
  console.log(participation);
});

scenario.step('create questions', function() {
	var requests = []; 

	for (var i = questionsData.length - 1; i >= 0; i--) {
		requests.push(this.post({ 
			url: '/' + poll._id + '/questions',
      body: questionsData[i],
			expect: { statusCode: 201 }
    }));
	}

  return this.all(requests); 
});

scenario.step('log created questions', function(responses) {
  questions = _.pluck(responses, 'body');
  _.each(responses, function(response) { console.log(response.statusCode); });
  console.log(questions.length + ' questions created:');
  _.each(questions, function(question) { console.log(question); });
});

scenario.step('create choices',  function()  { 
  var requests = []; 
	
	for (var j = choicesData.length - 1; j >= 0; j--) {
		for (var i = choicesData[j].length - 1; i >= 0; i--) {
	    requests.push(this.post({ 
	      url: '/' + poll._id + '/questions/' + questions[j]._id + '/choices',
	      body: choicesData[j][i],
	      expect: { statusCode: 201 }
	    }));
	  }
	}

  return this.all(requests); 
});

scenario.step('log created choices', function(responses) {

  choices = _.pluck(responses, 'body');
  _.each(responses, function(response) { console.log(response.statusCode); });
  console.log(choices.length + ' choices created:');
  _.each(choices, function(choice) { console.log(choice); });
});

scenario.step('create answers', function() { 
	var requests = []; 

	for (var i = questions.length - 1; i >= 0; i--) {
    requests.push(this.post({ 
    	url: '/' + poll._id + '/participations/' + participation._id + '/answers?question=' + questions[questions.length - i - 1]._id + '&choice=' + choices[(i * 3) + 1]._id,
      expect: { statusCode: 201 }
    }));
  }

	return this.all(requests);
});

scenario.step('log created answers', function(responses) {
	var answers = _.pluck(responses, 'body');
  _.each(responses, function(response) { console.log(response.statusCode); });
  console.log(answers.length + ' answers created:');
  _.each(answers, function(answer) { console.log(answer); });
});

scenario.step('read all answers', function() { 
  return this.get({
    url: '/' + poll._id + '/participations/' + participation._id + '/answers',
    expect: {
      statusCode: 200,
    }
  }); 
});

scenario.step('log all read answers', function(response) {
 
  var answers = response.body;
  console.log(response.statusCode);
  console.log(answers.length + ' answer read:');
  console.log(answers);

  return answers[0];
});

scenario.step('read answer', function(answer) { 
  return this.get({ 
		url: '/' + poll._id + '/participations/' + participation._id + '/answers/' + answer._id,
  	expect: { statusCode: 200 }
   });
});

scenario.step('log read answer', function(response) {
  console.log(response.statusCode);
  console.log(response.body);
});

module.exports = scenario;