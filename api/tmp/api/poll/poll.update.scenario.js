/**
 * poll.update.scenario.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 */

var copilot = require('api-copilot');

var _ = require('underscore');

var scenario = new copilot.Scenario({ 
  name: 'Poll CR UPDATE D',
  summary: 'Test poll CR UPDATE D.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

module.exports = scenario;


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
  return this.all(responses); 
});

scenario.step('update years', function(responses){

	var requests = [];
	var polls = _.pluck(responses, 'body');
	for (var i = polls.length - 1; i >= 0; i--) {
		var oldTitle = polls[i].title;
		var newTitle = oldTitle.substring(0,oldTitle.length-1) + "6";
		polls[i].title = newTitle ;
		requests.push(this.put({
			url:  '/' + polls[i]._id, 
			body: polls[i], 
			expect: { statusCode: 200 }
		}));
	}

  return this.all(requests); 
});

scenario.step('log updated polls', function(responses) {

  var polls = _.pluck(responses, 'body');

  console.log(polls.length + ' polls updated:');
  _.each(polls, function(poll) { console.log(poll); });
});

module.exports = scenario;