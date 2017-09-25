'use strict';

describe('fetcher', function () {
  var $componentController, controller;
  // load the service's module
  beforeEach(module('openweatherApp'));
  beforeEach(inject(function($injector) {
    $componentController = $injector.get('$componentController');
    controller = $componentController('fetcher', { $scope: {}});
    controller.cityListArr = [];
    controller.cities = [['Katowice', 'url']];
  }));

  it('should return 1 for element that exist', function() {
    var arr = [['Warszawa']];
    expect(controller.findIndex('Warszawa', arr)).toEqual(0);
  });
  it('should return -1 for element that does NOT exist', function() {
    var arr = [['Warszawa']];
    expect(controller.findIndex('Kraków', arr)).toEqual(-1);
  });
  it('should add 1 to array that counts clicks for sorting', function() {
    var arr = [['Warszawa']];
    controller.sortClicks = [0];
    controller.sort(arr, 0, 1);
    expect(controller.sortClicks[0]).toEqual(1);
    controller.sort(arr, 0, 2);
    expect(controller.sortClicks[0]).toEqual(2);
  });
  it('should reverse array for every second click', function() {
    var arr = [['B'], ['A']];
    controller.sortClicks = [1];
    controller.sort(arr, 0, 1);
    expect(arr).toEqual([['A'], ['B']]);
  });
  it('should sort array - bubble sort', function() {
    var arr = [[3], [1], [2]];
    controller.bubbleSort(arr, 0)
    expect(arr).toEqual([[1], [2], [3]]);
  });
  it('should sort array - selection sort', function() {
    var arr = [[3], [1], [2]];
    controller.selectionSort(arr, 0)
    expect(arr).toEqual([[1], [2], [3]]);
  });
  it('should add new city to cityListArr', function() {
    controller.addcity('Katowice', true, 60);
    expect(controller.cityListArr[0][0]).toEqual('Katowice');
    expect(controller.cityListArr[0][1]).toEqual('url');
  });
});
