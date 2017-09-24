'use strict';

angular.module('openweatherApp')
          .component('city', {
            restrict: 'E',
            bindings: {
              cityProperty: '=',
              getdata: '&'
            },
            templateUrl: 'views/city.html',
            controller: function () {
              this.valid = true;
              this.time = 4;

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
