'use strict';

describe('Directive: pwCardImage', function () {

  // load the directive's module and view
  beforeEach(module('polliwogApp'));
  beforeEach(module('app/directives/pw-card-image/pw-card-image.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<pw-card-image></pw-card-image>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the pwCardImage directive');
  }));
});