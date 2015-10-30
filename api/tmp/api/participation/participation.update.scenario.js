var copilot = require('api-copilot');

var scenario = new copilot.Scenario({ 
  name: 'Participation CR UPDATE D',
  summary: 'Test participation CR UPDATE D.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

module.exports = scenario;