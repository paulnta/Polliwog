var copilot = require('api-copilot');

var scenario = new copilot.Scenario({ 
  name: 'Question CREATE RUD',
  summary: 'Test question CREATE RUD.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

module.exports = scenario;