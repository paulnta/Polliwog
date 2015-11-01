/**
 * question.constraints.scenario.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 */

var copilot = require('api-copilot');
var poll 		= {};

var scenario = new copilot.Scenario({ 
  name: 'Question Constraints',
  summary: 'Check question model validation constraints.',
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
	console.log(response.statusCode);
  console.log(poll);  
});

scenario.step('create an empty question', function() {
	return this.post({
		url: '/' + poll._id + '/questions',
		body: {},
		expect: {
			statusCode: 500
		}
	});
});

scenario.step('log response when creating an empty question', function(response) {
  console.log(response.statusCode);
});

scenario.step('create a question with an empty title', function() {
	return this.post({
    url: '/' + poll._id + '/questions',
    body: {
      title: ''
    },
    expect: {
      statusCode: 500
    }
  });
});

scenario.step('log response when creating an question with an empty title', function(response) {
  console.log(response.statusCode);
});

scenario.step('create a valid question with default type', function() {
	return this.post({
    url: '/' + poll._id + '/questions',
    body: {
      title: 'What is api-copilot ?'
    },
    expect: {
      statusCode: 201
    }
  });
});

scenario.step('log created question with default type', function(response) {
	console.log(response.statusCode);
  console.log(response.body);
});

scenario.step('create a valid question with custom type', function() {
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

scenario.step('log created question with custom type', function(response) {
	console.log(response.statusCode);
  console.log(response.body);
});

module.exports = scenario;