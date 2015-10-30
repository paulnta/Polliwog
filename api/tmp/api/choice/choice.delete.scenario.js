var copilot = require('api-copilot');

var scenario = new copilot.Scenario({ 
  name: 'Choice CRU DELETE',
  summary: 'Test choice CRU DELETE.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

module.exports = scenario;