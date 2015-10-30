var copilot = require('api-copilot');

var scenario = new copilot.Scenario({ 
  name: 'Question CRU DELETE',
  summary: 'Test question CRU DELETE.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

module.exports = scenario;