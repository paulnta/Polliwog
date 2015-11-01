/**
 * participation.delete.scenario.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 */

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