var copilot = require('api-copilot');

var scenario = new copilot.Scenario({ 
  name: 'Poll CRUD',
  summary: 'Test poll CRUD.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

module.exports = scenario;