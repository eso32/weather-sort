'use strict';

angular.module('openweatherApp')
          .component('cityList', {
            restrict: 'E',
            bindings: {
              cities: '='
            },
            templateUrl: 'views/cityList.html'
        });
