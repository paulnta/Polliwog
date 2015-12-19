'use strict';

describe('Controller: HomeCtrl', function () {

  // load the controller's module
  beforeEach(module('polliwogApp'));

  var HomeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, Lecture,$rootScope) {
    scope = $rootScope.$new();

    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
