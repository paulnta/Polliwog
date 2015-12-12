/**
 * Created by paulnta on 11.12.15.
 */

var _ = require('underscore'),
    copilot = require('api-copilot');

var user = {
  email: 'speaker@speaker.com',
  password: 'speaker'
};

var scenario = new copilot.Scenario({
  name: 'RemoveAll',
  summary: 'Generated sample lectures',
  baseUrl: 'http://localhost:9000',
  defaultRequestOptions: {
    json: true
  }
});

scenario.step('Send credentials', function () {
  return this.post({
    url: '/auth/local',
    body: {
      email: user.email,
      password: user.password
    }
  })
});

scenario.step('Handle login data', function (response) {
  if(response.body.token) {
    this.extendDefaultRequestOptions({
      headers: {
        Authorization: 'Bearer ' + response.body.token
      }
    });
  } else {
    this.fail('unable to login');
  }
});


scenario.step('Remove all Lectures', function () {
  var urls = ['lectures', 'polls', 'questions', 'choices'];
  var requests = _.map(urls, function (url) {
    return this.delete({
      url: '/api/'+url
    });
  }, this);
  return this.all(requests);
});

scenario.step('Handle responses', function (responses) {
  responses = _.pluck(responses, 'body');
  console.log(responses);
});


module.exports = scenario;
