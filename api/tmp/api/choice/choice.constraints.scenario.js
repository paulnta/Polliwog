var copilot = require('api-copilot');
var poll		= {};
var question= {};

var scenario = new copilot.Scenario({ 
  name: 'Choice Constraints',
  summary: 'Check choice model validation constraints.',
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

scenario.step('create an empty choice', function() {
	return this.post({
		url: '/' + poll._id + '/questions/' + question._id + '/choices',
		body: {},
		expect: {
			statusCode: 500
		}
	});
});

scenario.step('create a choice with an empty key', function() {
	return this.post({
    url: '/' + poll._id + '/questions/' + question._id + '/choices',
    body: {
      key: '',
      text: 'A scenario is a series of steps that are executed in order.'
    },
    expect: {
      statusCode: 500
    }
  });
});

scenario.step('create a choice with an empty text', function() {
	return this.post({
    url: '/' + poll._id + '/questions/' + question._id + '/choices',
    body: {
      key: 'a',
      text:''
    },
    expect: {
      statusCode: 500
    }
  });
});

scenario.step('create a valid choice', function() {
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
	console.log(response.body);
});

module.exports = scenario;