var copilot = require('api-copilot');

var scenario = new copilot.Scenario({ 
  name: 'Participation CRU DELETE',
  summary: 'Test participation CRU DELETE.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

module.exports = scenario;