/**
 * participation.constraints.scenario.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 */

var copilot = require('api-copilot');
var poll 		= {};

var scenario = new copilot.Scenario({ 
  name: 'Participation Constraints',
  summary: 'Check participation model validation constraints.',
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

scenario.step('create an empty participation', function() {
	return this.post({
		url: '/' + poll._id + '/participations',
		body: {},
		expect: {
			statusCode: 500
		}
	});
});

scenario.step('log response when creating an empty participation', function(response) {
  console.log(response.statusCode);
});

scenario.step('create a participation with an empty participant', function() {
	return this.post({
    url: '/' + poll._id + '/participations',
    body: {
      participant: ''
    },
    expect: {
      statusCode: 500
    }
  });
});

scenario.step('log response when creating a participation with an empty participant', function(response) {
  console.log(response.statusCode);
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
	console.log(response.statusCode);
  console.log(response.body);
});

module.exports = scenario;