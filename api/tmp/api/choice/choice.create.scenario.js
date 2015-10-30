var copilot = require('api-copilot');

var scenario = new copilot.Scenario({ 
  name: 'Choice CREATE RUD',
  summary: 'Test choice CREATE RUD.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

module.exports = scenario;