/**
 * question.read.scenario.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 */

var copilot = require('api-copilot');

var scenario = new copilot.Scenario({ 
  name: 'Question C READ UD',
  summary: 'Test question C READ UD.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

var _ = require('underscore');
var poll = {};

var questionsData = [
	{title: 'What is the purpose of copilot API ?'},
	{title: 'How does copilot work ?'},
	{title: 'Why do we use RESTful APIs ?'},
	{title: 'When do you have to call the function "step" ?' }
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

scenario.step('create questions',  function()  { 
  var requests = []; 

	for (var i = questionsData.length - 1; i >= 0; i--) {
		requests.push(this.post({ 
				url: '/'+ poll._id +'/questions/',
		        body: questionsData[i],
				expect: { statusCode: 201 }
    }));
	}

  return this.all(requests); 
});

scenario.step('show created data', function(responses) {

  var questions = _.pluck(responses, 'body');
  

  console.log(questions.length + ' questions created:');
  _.each(questions, function(question) { console.log(question); });
  return questions;
});

scenario.step('read questions', function(questions){
	var requests = []; 

	for (var i = questionsData.length - 1; i >= 0; i--) {
		requests.push(this.get({ 
				url:  '/'+ poll._id +'/questions/' + questions[i]._id, 		        
				expect: { statusCode: 200 }
         }));
	}
  return this.all(requests); 
});

scenario.step('log questions', function(responses) {

  var questions = _.pluck(responses, 'body');

  console.log(questions.length + ' questions read:');
  _.each(questions, function(question) { console.log(question); });

});

module.exports = scenario;