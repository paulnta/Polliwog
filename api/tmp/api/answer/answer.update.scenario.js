var copilot = require('api-copilot');

var scenario = new copilot.Scenario({ 
  name: 'Answer CR UPDATE D',
  summary: 'Test answer CR UPDATE D.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

module.exports = scenario;