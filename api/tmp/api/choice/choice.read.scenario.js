var copilot = require('api-copilot');

var scenario = new copilot.Scenario({ 
  name: 'Choice C READ UD',
  summary: 'Test choice C READ UD.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

module.exports = scenario;