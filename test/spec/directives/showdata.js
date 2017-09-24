'use strict';

describe('Directive: showData', function () {

  // load the directive's module
  beforeEach(module('openweatherApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<show-data></show-data>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the showData directive');
  }));
});
