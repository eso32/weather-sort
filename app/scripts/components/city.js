'use strict';

angular.module('openweatherApp')
          .component('city', {
            restrict: 'E',
            bindings: {
              city: '=',
              addcity: '&'
            },
            templateUrl: 'views/city.html',
            controller: function () {
              this.valid = true;
              this.time = 60;
              this.checked = false;

              this.checkData = function(){
                if(this.time >= 1 && this.time <= 60){
                  this.valid = true;
                  this.addcity({
                    name: this.city,
                    checked: this.checked,
                    time: this.time
                  });
                } else {
                  this.valid = false;
                  this.checked = false;
                }
              }
            }
        });
