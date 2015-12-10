'use strict';

describe('Controller: ThingCtrl', function () {

  // load the controller's module
  beforeEach(module('polliwogApp'));

  var ThingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ThingCtrl = $controller('ThingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
