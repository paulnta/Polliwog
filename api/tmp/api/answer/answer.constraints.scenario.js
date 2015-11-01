/**
 * answer.constraints.scenario.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 *
 */

var copilot 			= require('api-copilot');
var poll					= {};
var participation	= {};
var question 			= {};
var choice 				= {};

var scenario = new copilot.Scenario({ 
  name: 'Answer Constraints',
  summary: 'Check answer model validation constraints.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

scenario.step('create a poll', function() {
  return this.post({
    body: {
    	title: 'api-copilot'
    },
    expect: {
      statusCode: 201
    }
  });
});

scenario.step('log created poll', function(response) {
	poll = response.body;
	console.log(poll);  
});

scenario.step('create a valid participation', function() {
	return this.post({
    url: '/' + poll._id + '/participations',
    body: {
      participant: 'yibnl'
    },
    expect: {
      statusCode: 201
    }
  });
});

scenario.step('log created participation', function(response) {
	participation = response.body;
	console.log(participation);
});

scenario.step('create a question', function() {
	return this.post({
    url: '/' + poll._id + '/questions',
    body: {
      title: 'What is a scenario ?',
      type: 'reminder'
    },
    expect: {
      statusCode: 201
    }
  });
});

scenario.step('log created question', function(response) {
	question = response.body;
	console.log(question);
});

scenario.step('create a choice', function() {
	return this.post({
    url: '/' + poll._id + '/questions/' + question._id + '/choices',
    body: {
      key: 'a',
      text: 'A scenario is a series of steps that are executed in order.'
    },
    expect: {
      statusCode: 201
    }
  });
});

scenario.step('log created choice', function(response) {
  choice = response.body;
  console.log(choice);
});

scenario.step('create an answer without associated question', function() { 
  return this.post({
    url: '/' + poll._id + '/participations/' + participation._id + '/answers?choice=' + choice._id,
    expect: {
      statusCode: 400
    }
  });
});

scenario.step('log error response returned since question is missing', function(response) {
	console.log(response.body);
});

scenario.step('create an answer without associated choice', function() { 
  return this.post({
    url: '/' + poll._id + '/participations/' + participation._id + '/answers?question=' + question._id,
    expect: {
      statusCode: 400
    }
  });
});

scenario.step('log error response returned since choice is missing', function(response) {
  console.log(response.body);
});

scenario.step('create an answer', function() { 
  return this.post({
    url: '/' + poll._id + '/participations/' + participation._id + '/answers?question=' + question._id + '&choice=' + choice._id,
    expect: {
      statusCode: 201
    }
  });
});

scenario.step('log created answer', function(response) {
  console.log(response.body);
});

module.exports = scenario;