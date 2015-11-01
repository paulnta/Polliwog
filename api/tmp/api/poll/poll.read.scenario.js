/**
 * poll.read.scenario.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 */

var copilot = require('api-copilot');

var _ 			= require('underscore');

var scenario = new copilot.Scenario({ 
  name: 'Poll C READ UD',
  summary: 'Test poll C READ UD.',
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

scenario.step('read polls', function(responses) {

	var requests = []; 

	for (var i = pollsData.length - 1; i >= 0; i--) {
		requests.push(this.get({ 
				url:  '/' + responses[i]._id, 		        
				expect: { statusCode: 200 }
         }));
	}
  return this.all(requests); 
});

scenario.step('log polls', function(responses) {

  var polls = _.pluck(responses, 'body');

  console.log(polls.length + ' polls read:');
  _.each(polls, function(poll) { console.log(poll); });

});

module.exports = scenario;