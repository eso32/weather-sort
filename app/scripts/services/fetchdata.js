'use strict';

/**
 * @ngdoc service
 * @name openweatherApp.fetchData
 * @description
 * # fetchData
 * Service in the openweatherApp.
 */
angular.module('openweatherApp')
.factory('fetchData', function($http) {
  return $http({
  method: 'GET',
  url: './cityName.json',
  headers: {
   'Content-Type': 'application/json'
  }
  }).then(function successCallback(response) {
      return response.data;
    }, function errorCallback(response) {
      console.log('Error occured '+response.status);
    });
});
