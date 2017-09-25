'use strict';

angular.module('openweatherApp')
          .component('cityList', {
            restrict: 'E',
            bindings: {
              cities: '='
            },
            templateUrl: 'views/cityList.html',
            controller: function () {
              this.valid = true;
              this.time = 4;

              this.addOne = function(city){
                console.log(city[1]);
                return city[1] = city[1] + 1;
              }

              this.checkData = function(){
                if(this.time >=1 && this.time <= 60){
                  this.valid = true;
                  this.getdata({location: this.cityProperty[0], time: this.time, checked: this.checked})
                } else {
                  this.valid = false;
                  this.checked = false;
                }
              }
            }
        });
