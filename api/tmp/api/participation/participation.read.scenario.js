/**
 * participation.read.scenario.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 */

var copilot = require('api-copilot');

var scenario = new copilot.Scenario({ 
  name: 'Participation C READ UD',
  summary: 'Test participation C READ UD.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

var _ = require('underscore');

var participationsData = [
	{participant: 'yibnl'},
	{participant: 'gweezer7'},
	{participant: 'paranoodle'},
	{participant: 'nta' }
];

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

scenario.step('create participations',  function()  { 
  var requests = []; 

	for (var i = participationsData.length - 1; i >= 0; i--) {
		requests.push(this.post({ 
				url: '/'+ poll._id +'/participations/',
		        body: participationsData[i],
				expect: { statusCode: 201 }
        }));
	}

  return this.all(requests); 
});

scenario.step('show created data', function(responses) {

  var participations = _.pluck(responses, 'body');
  

  console.log(participations.length + ' participations created:');
  _.each(participations, function(participation) { console.log(participation); });
  return participations;
});

scenario.step('read participations', function(responses){
	var requests = []; 

	for (var i = participationsData.length - 1; i >= 0; i--) {
		requests.push(this.get({ 
				url:  '/'+ poll._id +'/participations/' + responses[i]._id, 		        
				expect: { statusCode: 200 }
         }));
	}
  return this.all(requests); 
});

scenario.step('log participations', function(responses) {

  var participations = _.pluck(responses, 'body');

  console.log(participations.length + ' participations read:');
  _.each(participations, function(participation) { console.log(participation); });

});

module.exports = scenario;