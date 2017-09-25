'use strict';

describe('city', function () {
  var $componentController, controller;
  // load the service's module
  beforeEach(module('openweatherApp'));
  beforeEach(inject(function($injector) {
    $componentController = $injector.get('$componentController');
    controller = $componentController('city', { $scope: {}});
    controller.valid = true;
  }));

  it('should change value of controller.valid to false when time is <1 or >60', function() {
    controller.checkData(0.1)
    expect(controller.valid).toEqual(false);
    controller.checkData(61)
    expect(controller.valid).toEqual(false);
  });
});
