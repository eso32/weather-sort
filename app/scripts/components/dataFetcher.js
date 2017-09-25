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
              this.arrayOfCities = [];
              this.intervalList={};
              fetchData.then(function(response) {
                vm.cities = response;
              });

              this.addcity = function(name, checked, time){
                if(checked){
                  var index = findIndex(name, vm.cities);
                  var newCity = vm.cities[index];
                  vm.arrayOfCities.push(newCity);             //dodajemy nowe miasto do listy miast obserwowanych
                  var newIndex = vm.arrayOfCities.length-1;   //index nowo dodanego miasta
                  vm.arrayOfCities[newIndex][3] = time;
                  giveMeData(name);
                  this.getCurrentData(name);

                } else {
                  var index = findIndex(name, vm.arrayOfCities);
                  vm.arrayOfCities.splice(index,1);
                }
              }

              this.getCurrentData = function(name){
                var index = findIndex(name, vm.arrayOfCities);
                vm.arrayOfCities[index][2] = $interval( function(){giveMeData(name)}, vm.arrayOfCities[index][3]*1000);
              }

              function giveMeData(name){
                var index = findIndex(name, vm.arrayOfCities);
                var trustedUrl = $sce.trustAsResourceUrl(vm.arrayOfCities[index][1]);
                $http.jsonp(trustedUrl, {jsonpCallbackParam: 'callback'})
                      .then(function(response){
                        vm.arrayOfCities[index][4] = response.data.main.temp;
                        vm.arrayOfCities[index][5] = response.data.wind.speed;
                        vm.arrayOfCities[index][6] = response.data.main.pressure;
                        console.log(vm.arrayOfCities[index][0] + ' ' + vm.arrayOfCities[index][3]);
                      })
              }

              this.sort = function(arr, elem, sortType){
                if(sortType == 1){
                  bubbleSort(arr, elem);
                } else if(sortType == 2){
                  selectionSort(arr, elem);
                }
              }

              function bubbleSort(arr, elem){
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
                   return arr;
              }

              function selectionSort(arr, elem){
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

            }]
        });
