var copilot = require('api-copilot');

var scenario = new copilot.Scenario({ 
  name: 'Answer CREATE RUD',
  summary: 'Test answer CREATE RUD.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

module.exports = scenario;