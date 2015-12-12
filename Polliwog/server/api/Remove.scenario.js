/**
 * Created by paulnta on 11.12.15.
 */

var
  _ = require('underscore'),
  copilot = require('api-copilot'),
  Lecture = require('./lecture/lecture.model'),
  Question = require('./question/question.model'),
  Choice = require('./choice/choice.model');

var user = {
  email: 'speaker@speaker.com',
  password: 'speaker'
};

var lectures = [
  {name: 'Web Technologies', description: 'A lecture about web technologies'},
  {name: 'Probability', description: 'We love maths '},
  {name: 'Computer Sciences', description: 'We love computers '}
];

var ids_lecture  = [];
var ids_polls = [];
var ids_questions = [];

var polls = [
  {title:'Test 1'}, {title:'Test 2'}, {title:'Test 3'},
  {title:'Test 4'}, {title:'Test 5'}, {title:'Test 6'},
  {title:'Test 7'}, {title:'Test 8'}, {title:'Test 9'}
];

var questions = [
  {title: 'question 1'}, {title: 'question 2'}, {title: 'question 3'},
  {title: 'question 1'}, {title: 'question 2'}, {title: 'question 3'},
  {title: 'question 1'}, {title: 'question 2'}, {title: 'question 3'},

  {title: 'question 1'}, {title: 'question 2'}, {title: 'question 3'},
  {title: 'question 1'}, {title: 'question 2'}, {title: 'question 3'},
  {title: 'question 1'}, {title: 'question 2'}, {title: 'question 3'},

  {title: 'question 1'}, {title: 'question 2'}, {title: 'question 3'},
  {title: 'question 1'}, {title: 'question 2'}, {title: 'question 3'},
  {title: 'question 1'}, {title: 'question 2'}, {title: 'question 3'}
];

var choices = [
  {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'},
  {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'},
  {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'},

  {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'},
  {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'},
  {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'},

  {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'},
  {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'},
  {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}, {key: 'a', text: 'hello 1'}, {key: 'b', text: 'hello 2'}, {key: 'c', text: 'hello 3'}
];

var scenario = new copilot.Scenario({
  name: 'Remove',
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

scenario.step('get lectures', function () {
  return this.get({
    url: '/api/lectures'
  });
});


scenario.step('Remove first lecture', function (response) {
  var lectures = response.body;
  if(0 === lectures.length){
    return this.fail('no lectures found');
  }
  console.log(lectures.length + ' lectures found');
  console.log('will remove ' + lectures[0]._id);

  return this.delete({
    url: '/api/lectures/' + lectures[0]._id
  });

});

scenario.step('handle repsonse', function (response) {
  console.log(response.body);
});



module.exports = scenario;
