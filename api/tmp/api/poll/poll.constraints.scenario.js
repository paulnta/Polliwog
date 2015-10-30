var copilot = require('api-copilot');

var scenario = new copilot.Scenario({ 
  name: 'Poll Constraints',
  summary: 'Check poll model validation constraints.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

scenario.step('create an empty poll', function() {
  return this.post({
    body: {},
    expect: {
      statusCode: 500
    }
  });
});

scenario.step('create a poll with an empty title', function() {
  return this.post({
    body: {
      title: ''
    },
    expect: {
      statusCode: 500
    }
  });
});

scenario.step('create a poll with an invalid state', function() {
  return this.post({
    body: {
      title: 'my poll with an invalid state',
      state: 'any'
    },
    expect: {
      statusCode: 500
    }
  });
});


scenario.step('create a poll with a default state', function() {
  return this.post({
    body: {
      title: 'my drafti poll'
    },
    expect: {
      statusCode: 201,
    }
  });
});

scenario.step('log created poll with a default state', function(response) {
  console.log(response);
  var poll = response.body;
  if (poll.state !== 'drafti') {
    return this.fail('created poll has not a default state');
  }
  console.log(poll);
})

scenario.step('create a poll with an active state', function() {
  return this.post({
    body: {
      title: 'my active poll',
      state: 'active'
    },
    expect: {
      statusCode: 201,
    }
  });
});

scenario.step('log created poll with an active state', function(response) {
  var poll = response.body;
  if (poll.state !== 'active') {
    return this.fail('created poll has not an active state');
  }
  console.log(poll);
})

scenario.step('create a poll with a closed state', function() {
  return this.post({
    body: {
      title: 'my closed poll',
      state: 'closed'
    },
    expect: {
      statusCode: 201,
    }
  });
});

scenario.step('log created poll with a closed state', function(response) {
  var poll = response.body;
  if (poll.state !== 'closed') {
    return this.fail('created poll has not a closed state');
  }
  console.log(poll);
})

module.exports = scenario;