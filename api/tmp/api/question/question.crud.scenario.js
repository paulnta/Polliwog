var copilot = require('api-copilot');

var scenario = new copilot.Scenario({ 
  name: 'Question CRUD',
  summary: 'Test question CRUD.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

module.exports = scenario;