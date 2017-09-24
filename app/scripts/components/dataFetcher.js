'use strict';

function findIndex(location, array){
  for(var i = 0; i<array.length; i++){
    if(location === array[i][0]) return i
  }
  return -1;
}

angular.module('openweatherApp')
          .component('fetcher', {
            restrict: 'E',
            templateUrl: 'views/dataFetcher.html',
            controller: ['$sce', '$http', 'fetchData', '$interval', function ($sce, $http, fetchData, $interval) {
              var vm = this;
              this.checked;
              this.sortType = 2;

              fetchData.then(function(response) {
                vm.cities = response;
              });

              this.sort = function(arr, elem, sortType){
                if(sortType == 1){
                  this.bubbleSort(arr, elem);
                } else if(sortType == 2){
                  this.selectionSort(arr, elem);
                }
              }

              this.bubbleSort = function(arr, elem){
                  console.log("bubble");
                  var len = arr.length;

                   for (var i = len-1; i>=0; i--){ //for(4; i>=0; i--)
                    // console.log('i='+i);
                     for(var j = 1; j<=i; j++){
                        // console.log('j='+j);
                       if(arr[j-1][elem]>arr[j][elem]){
                           var temp = arr[j-1];
                           arr[j-1] = arr[j];
                           arr[j] = temp;
                        }
                     }
                   }
                   vm.cities = arr;
                   return arr;
              }

              this.selectionSort = function(arr, elem){
                console.log("selection");
                var minIdx, temp,
                    len = arr.length;
                for(var i = 0; i < len; i++){
                  minIdx = i;
                  for(var  j = i+1; j<len; j++){
                     if(arr[j][elem]<arr[minIdx][elem]){
                        minIdx = j;
                     }
                  }
                  temp = arr[i];
                  arr[i] = arr[minIdx];
                  arr[minIdx] = temp;
                }
                return arr;
              }

              this.isChecked = function(location, time, checked){
                if(checked){
                  this.getCurrentData(location, time);
                } else {
                  var index = findIndex(location, vm.cities);
                  $interval.cancel(vm.cities[index][2]);
                }
              }

              this.getCurrentData = function(location, time){
                var index = findIndex(location, vm.cities);

                vm.cities[index][2] = $interval(function(){
                  var index = findIndex(location, vm.cities);
                  var trustedUrl = $sce.trustAsResourceUrl(vm.cities[index][1]);

                  $http.jsonp(trustedUrl, {jsonpCallbackParam: 'callback'})
                        .then(function(response){
                          vm.cities[index][3] = response.data.main.temp;
                          vm.cities[index][4] = response.data.wind.speed;
                          vm.cities[index][5] = response.data.main.pressure;
                          console.log(vm.cities[index][0] + ": " +vm.cities[index][3]);
                        })
                }, time*1000);
              }
            }]
        });
