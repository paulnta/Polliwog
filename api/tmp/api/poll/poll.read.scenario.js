var copilot = require('api-copilot');

var scenario = new copilot.Scenario({ 
  name: 'Poll C READ UD',
  summary: 'Test poll C READ UD.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

module.exports = scenario;