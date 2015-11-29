'use strict';

describe('Directive: myDirective', function () {

  // load the directive's module and view
  beforeEach(module('polliwogApp'));
  beforeEach(module('app/myDirective/myDirective.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-directive></my-directive>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the myDirective directive');
  }));
});