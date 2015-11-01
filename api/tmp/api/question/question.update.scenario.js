/**
 * question.update.scenario.js
 *
 * Created on: 2015-11-01
 *     Author: Yassin Kammoun (yassin.kammoun@heig-vd.ch)
 */

var copilot = require('api-copilot');

var scenario = new copilot.Scenario({ 
  name: 'Question CR UPDATE D',
  summary: 'Test question CR UPDATE D.',
  baseUrl: 'http://localhost:3000/api/polls',
  defaultRequestOptions: {
    json: true
  }
});

module.exports = scenario;