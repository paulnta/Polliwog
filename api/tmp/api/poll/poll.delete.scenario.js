/**
 * poll.delete.scenario.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 */

var copilot = require('api-copilot');
var _ 			= require('underscore');

var scenario = new copilot.Scenario({ 
  name: 'Poll CRU DELETE',
  summary: 'Test poll CRU DELETE.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

var pollsData = [
	{title: 'TWEB-2015', state: 'drafti'},
	{title: 'AMT-2015', state: 'active'},
	{title: 'RES-2015', state: 'closed'},
	{title: 'MAC-2015' }
];

scenario.step('create polls',  function()  { 
  var requests = []; 

	for (var i = pollsData.length - 1; i >= 0; i--) {
		requests.push(this.post({ 
      body: pollsData[i],
			expect: { statusCode: 201 }
    }));
	}

  return this.all(requests); 
});

scenario.step('log created polls', function(responses) {

  var polls = _.pluck(responses, 'body');

  console.log(polls.length + ' polls created:');
  _.each(polls, function(poll) { console.log(poll); });

  return polls;
});

scenario.step('delete polls', function(polls) {
	var requests = []; 

	for (var i = polls.length - 1; i >= 0; i--) {
		requests.push(this.delete({ 
      url:  '/' + polls[i]._id, 
			expect: { statusCode: 204 }
    }));
	}

  return this.all(requests);
});

scenario.step('log deleted polls responses', function(responses) {
	console.log(responses.length + ' polls deleted:');
	_.each(responses, function(response) { console.log(response.statusMessage); });
});

module.exports = scenario;