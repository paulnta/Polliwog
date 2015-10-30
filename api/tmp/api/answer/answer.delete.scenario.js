var copilot = require('api-copilot');

var scenario = new copilot.Scenario({ 
  name: 'Answer CRU DELETE',
  summary: 'Test answer CRU DELETE.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

module.exports = scenario;