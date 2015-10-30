var copilot = require('api-copilot');

var scenario = new copilot.Scenario({ 
  name: 'Participation CRUD',
  summary: 'Test participation CRUD.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

module.exports = scenario;